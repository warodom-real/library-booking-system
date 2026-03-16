const app = require('./src/app')

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})

cron.schedule("* * * * *", async () => {

    console.log("checking book due...")

    const sql = `
    SELECT 
    booked_system.end_date,
    users.email,
    books.name AS book_name
    FROM booked_system
    JOIN users ON booked_system.user_id = users.id
    JOIN books ON booked_system.book_id = books.id
    WHERE status='borrowed'
    AND end_date <= DATE_ADD(NOW(), INTERVAL 1 DAY)
    `

    const [rows] = await db.query(sql)

    for (let row of rows) {

        // ส่ง email
        console.log(
            `send reminder to ${row.email}`
        )

    }

})