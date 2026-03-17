const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "กรุณา Login ก่อน" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ message: "Token ไม่ถูกต้องหรือหมดอายุ" })
    }
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "ไม่มีสิทธิ์เข้าถึง" })
        }
        next()
    })
}

module.exports = { verifyToken, verifyAdmin }
