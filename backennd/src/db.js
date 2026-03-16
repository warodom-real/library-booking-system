const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "127.0.0.1",
    port: 8700,
    user: "root",
    password: "root",
    database: "webdb"
})

db.connect((err) => {
    if (err) {
        console.error("Database connection error:", err)
    } else {
        console.log("MySQL Connected")
        db.query("SET time_zone = '+07:00'")  // เพิ่มตรงนี้
    }
})

module.exports = db