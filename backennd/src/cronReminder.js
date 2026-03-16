const cron = require("node-cron");
const db = require("./db");
const sendReminder = require("./emailService");

cron.schedule("* * * * *", () => {

    console.log("checking books...");

    const sql = `
        SELECT 
        bs.id,
        bs.end_date,
        u.username AS email,
        b.book_name
        FROM booked_system bs
        JOIN users u ON bs.user_id = u.id
        JOIN books b ON bs.book_id = b.id
        WHERE bs.status='borrowed'
        AND TIMESTAMPDIFF(HOUR, NOW(), bs.end_date) <= 24
        `;
    db.query(sql, async (err, results) => {

        if (err) {
            console.log(err);
            return;
        }
        console.log(results)
        for (let row of results) {

            console.log("Sending email to:", row.email);

            await sendReminder(
                row.email,
                row.book_name,
                row.end_date
            );

        }

    });

});