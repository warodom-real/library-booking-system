const booksModel = require('../models/booksModel')

const booksController = {
    getAll: async (req, res) => {
        try {
            const result = await booksModel.getAll()
            res.json(result)
        } catch (err) {
            res.status(500).json({ message: "Database error" })
        }
    },

    getById: async (req, res) => {
        try {
            const result = await booksModel.getById(req.params.id)
            res.json(result)
        } catch (err) {
            res.status(500).json({ message: "Database error" })
        }
    },

    getByCategory: async (req, res) => {
        try {
            const result = await booksModel.getByCategory(req.params.id)
            res.json(result)
        } catch (err) {
            res.status(500).json({ message: "Database error" })
        }
    },

    getAvailable: async (req, res) => {
        try {
            const result = await booksModel.getAvailable()
            res.json(result)
        } catch (err) {
            res.status(500).json({ message: "Database error" })
        }
    },

    create: async (req, res) => {
        try {
            const { book_name, author, description, category_id } = req.body
            const book_images = req.file?.filename

            if (!book_images) {
                return res.status(400).json({ message: "กรุณาอัปโหลดรูปภาพ" })
            }

            await booksModel.create(book_name, author, description, book_images, category_id)
            res.json({ message: "เพิ่มหนังสือสำเร็จ" })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: "เพิ่มหนังสือไม่ได้" })
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params
            const { book_name, author, description, category_id } = req.body

            let sql, params
            if (req.file) {
                sql = `UPDATE books SET book_name=?, author=?, description=?, book_images=?, category_id=? WHERE id=?`
                params = [book_name, author, description, req.file.filename, category_id, id]
            } else {
                sql = `UPDATE books SET book_name=?, author=?, description=?, category_id=? WHERE id=?`
                params = [book_name, author, description, category_id, id]
            }

            await booksModel.update(sql, params)
            res.json({ message: "แก้ไขหนังสือสำเร็จ" })
        } catch (err) {
            res.status(500).json({ message: "แก้ไขหนังสือไม่ได้" })
        }
    },

    updateStatus: async (req, res) => {
        try {
            await booksModel.updateStatus(req.body.status, req.params.id)
            res.json({ message: "อัพเดตสถานะสำเร็จ" })
        } catch (err) {
            res.status(500).json({ message: "ไม่สามารถอัพเดตสถานะได้" })
        }
    },

    delete: async (req, res) => {
        try {
            await booksModel.delete(req.params.id)
            res.json({ message: "ลบหนังสือสำเร็จ" })
        } catch (err) {
            res.status(500).json({ message: "ลบหนังสือไม่ได้" })
        }
    }
}

module.exports = booksController
