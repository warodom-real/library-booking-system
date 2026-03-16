const express = require('express')
const router = express.Router()
const db = require('../db')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })


router.post('/add', upload.single('book_images'), (req, res) => {

    const { book_name, author, description, category_id } = req.body
    const book_images = req.file.filename

    const sql = `
        INSERT INTO books (book_name, author, description, book_images, category_id)
        VALUES (?,?,?,?,?)
    `

    db.query(sql, [book_name, author, description, book_images, category_id], (err) => {

        if (err) {
            return res.status(500).json({ message: "เพิ่มหนังสือไม่ได้" })
        }

        res.json({
            message: "เพิ่มหนังสือสำเร็จ"
        })

    })

})

/* =========================
   GET ALL BOOKS
========================= */

router.get('/', (req, res) => {

    const sql = `
    SELECT 
    books.id,
    books.book_name,
    books.author,
    books.book_images,
    books.description,
    books.status,
    categories.category_name
    FROM books
    JOIN categories 
    ON books.category_id = categories.id
`

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err)
            return res.status(500).json({ message: "Database error" })
        }

        res.json(result)

    })

})

/* =========================
   UPDATE BOOK
========================= */

router.put('/:id', upload.single('book_images'), (req, res) => {

    const id = req.params.id

    const { book_name, author, description, category_id } = req.body

    let sql
    let params

    if (req.file) {

        const book_images = req.file.filename

        sql = `
        UPDATE books 
        SET book_name=?, author=?, description=?, book_images=?, category_id=?
        WHERE id=?
        `

        params = [book_name, author, description, book_images, category_id, id]

    } else {

        sql = `
        UPDATE books 
        SET book_name=?, author=?, description=?, category_id=?
        WHERE id=?
        `

        params = [book_name, author, description, category_id, id]

    }

    db.query(sql, params, (err) => {

        if (err) {
            return res.status(500).json({
                message: "แก้ไขหนังสือไม่ได้"
            })
        }

        res.json({
            message: "แก้ไขหนังสือสำเร็จ"
        })

    })

})

/* =========================
   GET BOOK BY CATEGORY
========================= */

router.get('/category/:id', (req, res) => {

    const categoryId = req.params.id

    const sql = `
        SELECT books.*, categories.category_name
        FROM books
        JOIN categories 
        ON books.category_id = categories.id
        WHERE books.category_id = ?
    `

    db.query(sql, [categoryId], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database error"
            })
        }

        res.json(result)

    })

})


router.get('/available', (req, res) => {

    const sql = "SELECT * FROM books WHERE status = 'available'"

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({ message: "Database error" })
        }

        res.json(result)

    })

})

/* =========================
   GET BOOK BY ID
========================= */

router.get('/:id', (req, res) => {

    const id = req.params.id

    db.query(
        'SELECT * FROM books WHERE id = ?',
        [id],
        (err, result) => {
            res.json(result)
        })

})

/* =========================
   UPDATE STATUS
========================= */

router.put('/status/:id', (req, res) => {

    const id = req.params.id
    const { status } = req.body

    const sql = "UPDATE books SET status = ? WHERE id = ?"

    db.query(sql, [status, id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "ไม่สามารถอัพเดตสถานะได้"
            })
        }

        res.json({
            message: "อัพเดตสถานะสำเร็จ"
        })

    })

})


/* =========================
   DELETE BOOK
========================= */

router.delete('/:id', (req, res) => {

    const id = req.params.id

    const sql = "DELETE FROM books WHERE id = ?"

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "ลบหนังสือไม่ได้"
            })
        }

        res.json({
            message: "ลบหนังสือสำเร็จ"
        })

    })

})

module.exports = router
