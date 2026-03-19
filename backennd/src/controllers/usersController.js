const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const usersController = {
    register: async (req, res) => {
        try {
            const username = req.body.username.trim().toLowerCase()
            const password = req.body.password.trim()

            const gmailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|ku\.th)$/
            if (!gmailPattern.test(username)) {
                return res.status(400).json({ message: "กรุณาใช้ Gmail เท่านั้นหรือ @ku.th" })
            }

            const existing = await userModel.findByUsername(username)
            if (existing.length > 0) {
                return res.status(400).json({ message: "Gmail นี้ถูกใช้แล้ว กรุณาใช้ Gmail อื่น" })
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            await userModel.createUser(username, hashedPassword)

            res.status(201).json({ message: "สมัครสมาชิกสำเร็จ" })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: "ไม่สามารถสมัครสมาชิกได้" })
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body

            const result = await userModel.findByUsername(username)
            if (result.length === 0) {
                return res.status(400).json({ message: "username ไม่ถูกต้อง" })
            }

            const user = result[0]

            // เช็คว่า password เป็น bcrypt hash หรือ plain text
            const isBcrypt = user.password.startsWith('$2b$') || user.password.startsWith('$2a$')

            let isMatch = false

            if (isBcrypt) {
                // password ใหม่ — ใช้ bcrypt
                isMatch = await bcrypt.compare(password, user.password)
            } else {
                // password เก่า — เปรียบเทียบตรงๆ แล้ว migrate เป็น hash อัตโนมัติ
                isMatch = (password === user.password)

                if (isMatch) {
                    // อัพเดตเป็น hash ทันทีที่ login สำเร็จ
                    const hashed = await bcrypt.hash(password, 10)
                    await userModel.updatePassword(user.id, hashed)
                }
            }

            if (!isMatch) {
                return res.status(400).json({ message: "password ไม่ถูกต้อง" })
            }
            
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            )

            res.status(200).json({
                message: "Login สำเร็จ",
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: "Database error" })
        }
    }

}

module.exports = usersController
