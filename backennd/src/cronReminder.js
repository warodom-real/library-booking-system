const cron = require("node-cron");
const db = require("./db");
const { sendReminder } = require("./emailService");

cron.schedule("*/10 * * * * *", () => {
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
        AND bs.reminded = 0
        AND TIMESTAMPDIFF(HOUR, DATE_ADD(NOW(), INTERVAL 7 HOUR), bs.end_date) <= 24
        AND TIMESTAMPDIFF(HOUR, DATE_ADD(NOW(), INTERVAL 7 HOUR), bs.end_date) >= 0
    `;

    db.query(sql, async (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(results);

        for (let row of results) {
            console.log("Sending email to:", row.email);

            await sendReminder(row.email, row.book_name, row.end_date);

            // มาร์คว่าส่งแล้ว ไม่ส่งซ้ำ
            db.query("UPDATE booked_system SET reminded = 1 WHERE id = ?", [row.id]);
        }
    });
});