const express = require('express')
const router = express.Router()
const db = require('../db')
const { sendThankYou } = require('../emailService')

router.get('/', (req, res) => {

    const sql = `
    SELECT 
        booked_system.id,
        booked_system.book_id,
        booked_system.user_id,
        booked_system.start_date,
        booked_system.end_date,
        booked_system.days,
        booked_system.status
    FROM booked_system
    WHERE status='borrowed'
    `

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database error"
            })
        }

        res.json(result)

    })

})

router.post('/borrow', (req, res) => {

    const { user_id, book_id, days } = req.body

    if (days > 30) {
        return res.status(400).json({
            message: "จองได้สูงสุด 30 วัน"
        })
    }
    const start_date = new Date()

    const end_date = new Date(start_date)
    end_date.setDate(end_date.getDate() + parseInt(days))

    // เช็คว่าหนังสือว่างไหม
    const checkBook = "SELECT * FROM books WHERE id=? AND status='available'"

    db.query(checkBook, [book_id], (err, result) => {

        if (result.length === 0) {
            return res.status(400).json({
                message: "หนังสือถูกยืมอยู่"
            })
        }

        const insertBooking = `INSERT INTO booked_system(user_id,book_id,start_date,end_date,days,status)VALUES(?,?,?,?,?,'borrowed')`

        db.query(insertBooking,
            [user_id, book_id, start_date, end_date, days],
            (err) => {

                if (err) {
                    return res.status(500).json({ message: "จองไม่สำเร็จ" })
                }

                db.query(
                    "UPDATE books SET status = 'borrowed' WHERE id = ?",
                    [book_id]
                )
                // เปลี่ยน status หนังสือ

                res.json({
                    message: "จองหนังสือสำเร็จ"
                })

            })

    })

})

router.post('/return', (req, res) => {

    const { book_id } = req.body

    const updateBook = "UPDATE books SET status='available' WHERE id=?"
    const updateBooking = `
        UPDATE booked_system 
        SET status='returned'
        WHERE book_id=? AND status='borrowed'
    `
    // ดึง email และชื่อหนังสือ
    const getInfo = `
        SELECT u.username AS email, b.book_name
        FROM booked_system bs
        JOIN users u ON bs.user_id = u.id
        JOIN books b ON bs.book_id = b.id
        WHERE bs.book_id=? AND bs.status='borrowed'
    `

    db.query(getInfo, [book_id], async (err, result) => {

        if (err || result.length === 0) {
            return res.status(500).json({ message: "คืนหนังสือไม่ได้" })
        }

        const { email, book_name } = result[0]

        db.query(updateBook, [book_id])
        db.query(updateBooking, [book_id])

        // ส่ง email ขอบคุณ
        await sendThankYou(email, book_name)

        res.json({ message: "คืนหนังสือสำเร็จ" })

    })

})
router.get('/history/:user_id', (req, res) => {

    const user_id = req.params.user_id

    const sql = `
        SELECT 
        booked_system.id,
        booked_system.book_id,
        books.book_name,
        books.author,
        books.book_images,
        booked_system.start_date,
        booked_system.end_date,
        booked_system.days,
        booked_system.status
    FROM booked_system
    JOIN books ON booked_system.book_id = books.id
    WHERE booked_system.user_id = ?
        `

    db.query(sql, [user_id], (err, result) => {

        if (err) {
            console.log(err)
            return res.status(500).json({
                message: "Database error"
            })
        }

        res.json(result)

    })

})
module.exports = router
