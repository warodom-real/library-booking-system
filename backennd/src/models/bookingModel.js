const db = require('../db')

const bookingModel = {
    getBorrowed: () => new Promise((resolve, reject) => {
        const sql = `
            SELECT id, book_id, user_id, start_date, end_date, days, status
            FROM booked_system WHERE status='borrowed'
        `
        db.query(sql, (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    }),

    checkBookAvailable: (book_id) => new Promise((resolve, reject) => {
        db.query("SELECT * FROM books WHERE id=? AND status='available'", [book_id], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    }),

    insertBorrow: (user_id, book_id, start_date, end_date, days) => new Promise((resolve, reject) => {
        const sql = `INSERT INTO booked_system(user_id, book_id, start_date, end_date, days, status) VALUES(?,?,?,?,?,'borrowed')`
        db.query(sql, [user_id, book_id, start_date, end_date, days], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    }),

    updateBookStatus: (status, book_id) => new Promise((resolve, reject) => {
        db.query("UPDATE books SET status = ? WHERE id = ?", [status, book_id], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    }),

    getReturnInfo: (book_id) => new Promise((resolve, reject) => {
        const sql = `
            SELECT u.username AS email, b.book_name
            FROM booked_system bs
            JOIN users u ON bs.user_id = u.id
            JOIN books b ON bs.book_id = b.id
            WHERE bs.book_id=? AND bs.status='borrowed'
        `
        db.query(sql, [book_id], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    }),

    updateReturnStatus: (book_id) => new Promise((resolve, reject) => {
        db.query(
            "UPDATE booked_system SET status='returned' WHERE book_id=? AND status='borrowed'",
            [book_id],
            (err, result) => {
                if (err) return reject(err)
                resolve(result)
            }
        )
    }),

    getHistory: (user_id) => new Promise((resolve, reject) => {
        const sql = `
            SELECT booked_system.id, booked_system.book_id, books.book_name,
                   books.author, books.book_images, booked_system.start_date,
                   booked_system.end_date, booked_system.days, booked_system.status
            FROM booked_system
            JOIN books ON booked_system.book_id = books.id
            WHERE booked_system.user_id = ?
        `
        db.query(sql, [user_id], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}

module.exports = bookingModel
