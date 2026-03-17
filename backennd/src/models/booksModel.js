const db = require('../db')

const booksModel = {
    getAll: () => new Promise((resolve, reject) => {
        const sql = `
            SELECT books.id, books.book_name, books.author, books.book_images,
                   books.description, books.status, categories.category_name
            FROM books
            JOIN categories ON books.category_id = categories.id
        `
        db.query(sql, (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    }),

    getById: (id) => new Promise((resolve, reject) => {
        db.query("SELECT * FROM books WHERE id = ?", [id], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    }),

    getByCategory: (categoryId) => new Promise((resolve, reject) => {
        const sql = `
            SELECT books.*, categories.category_name
            FROM books
            JOIN categories ON books.category_id = categories.id
            WHERE books.category_id = ?
        `
        db.query(sql, [categoryId], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    }),

    getAvailable: () => new Promise((resolve, reject) => {
        db.query("SELECT * FROM books WHERE status = 'available'", (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    }),

    create: (book_name, author, description, book_images, category_id) => new Promise((resolve, reject) => {
        const sql = `INSERT INTO books (book_name, author, description, book_images, category_id) VALUES (?,?,?,?,?)`
        db.query(sql, [book_name, author, description, book_images, category_id], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    }),

    update: (sql, params) => new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    }),

    updateStatus: (status, id) => new Promise((resolve, reject) => {
        db.query("UPDATE books SET status = ? WHERE id = ?", [status, id], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    }),

    delete: (id) => new Promise((resolve, reject) => {
        db.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}

module.exports = booksModel
