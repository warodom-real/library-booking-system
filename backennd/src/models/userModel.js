const db = require('../db')

const userModel = {
    findByUsername: (username) => new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    }),

    createUser: (username, password) => new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO users(username, password, role) VALUES (?, ?, ?)",
            [username, password, "user"],
            (err, result) => {
                if (err) return reject(err)
                resolve(result)
            }
        )
    }),

    updatePassword: (id, hashedPassword) => new Promise((resolve, reject) => {
        db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, id], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}

module.exports = userModel