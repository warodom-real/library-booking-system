const app = require('./src/app')
const cron = require('node-cron')
const db = require('./src/db')
const sendReminder = require("./src/emailService")

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})

cron.schedule("*/30 * * * * *", () => {

    console.log("checking book due...")

    const sql = `
   SELECT
    booked_system.end_date,
    users.username AS email,
    books.book_name
    FROM booked_system
    JOIN users ON booked_system.user_id = users.id
    JOIN books ON booked_system.book_id = books.id
    WHERE booked_system.status='borrowed'
    AND end_date <= DATE_ADD(NOW(), INTERVAL 1 DAY)
    `

    db.query(sql, (err, results) => {

        if (err) {
            console.log(err)
            return
        }

        console.log("RESULT:", results)

        results.forEach(row => {
            console.log("Sending email to:", row.email)

            sendReminder(row.email, row.book_name, row.end_date)
        })

    })
})