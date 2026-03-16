const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/register', (req, res) => {

    const username = req.body.username.trim().toLowerCase()
    const password = req.body.password.trim()

    // ตรวจ gmail format
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

    if (!gmailPattern.test(username)) {
        return res.status(400).json({
            message: "กรุณาใช้ Gmail เท่านั้น"
        })
    }

    // เช็ค gmail ซ้ำ
    const checkUser = "SELECT * FROM users WHERE username = ?"

    db.query(checkUser, [username], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database error"
            })
        }

        if (result.length > 0) {
            return res.status(400).json({
                message: "Gmail นี้ถูกใช้แล้ว กรุณาใช้ Gmail อื่น"
            })
        }

        // insert user
        const sql = "INSERT INTO users(username,password,role) VALUES (?,?,?)"

        db.query(sql, [username, password, "user"], (err, result) => {

            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "ไม่สามารถสมัครสมาชิกได้"
                })
            }
            res.status(200).json({
                message: "สมัครสมาชิกสำเร็จ"
            })

        })

    })

})

router.post('/login', (req, res) => {

    const { username, password } = req.body

    const sql = "SELECT * FROM users WHERE username = ?"

    db.query(sql, [username], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database error"
            })
        }

        if (result.length === 0) {
            return res.status(400).json({
                message: "username ไม่ถูกต้อง"
            })
        }

        const user = result[0]

        if (user.password !== password) {
            return res.status(400).json({
                message: "password ไม่ถูกต้อง"
            })
        }

        // ✅ login สำเร็จ
        res.status(200).json({
            message: "Login สำเร็จ",
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        })

    })

})

module.exports = router