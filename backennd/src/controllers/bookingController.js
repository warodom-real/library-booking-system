const bookingModel = require('../models/bookingModel')
const { sendThankYou } = require('../emailService')

const bookingController = {
    getBorrowed: async (req, res) => {
        try {
            const result = await bookingModel.getBorrowed()
            res.json(result)
        } catch (err) {
            res.status(500).json({ message: "Database error" })
        }
    },

    borrow: async (req, res) => {
        try {
            const { user_id, book_id, days } = req.body

            if (days > 30) {
                return res.status(400).json({ message: "จองได้สูงสุด 30 วัน" })
            }

            const available = await bookingModel.checkBookAvailable(book_id)
            if (available.length === 0) {
                return res.status(400).json({ message: "หนังสือถูกยืมอยู่" })
            }

            const start_date = new Date()
            const end_date = new Date(start_date)
            end_date.setDate(end_date.getDate() + parseInt(days))

            await bookingModel.insertBorrow(user_id, book_id, start_date, end_date, days)
            await bookingModel.updateBookStatus('borrowed', book_id)

            res.json({ message: "จองหนังสือสำเร็จ" })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: "จองไม่สำเร็จ" })
        }
    },

    returnBook: async (req, res) => {
        try {
            const { book_id } = req.body

            const info = await bookingModel.getReturnInfo(book_id)
            if (info.length === 0) {
                return res.status(400).json({ message: "ไม่พบข้อมูลการยืม" })
            }

            const { email, book_name } = info[0]

            await bookingModel.updateBookStatus('available', book_id)
            await bookingModel.updateReturnStatus(book_id)
            await sendThankYou(email, book_name)

            res.json({ message: "คืนหนังสือสำเร็จ" })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: "คืนหนังสือไม่ได้" })
        }
    },

    getHistory: async (req, res) => {
        try {
            const result = await bookingModel.getHistory(req.params.user_id)
            res.json(result)
        } catch (err) {
            res.status(500).json({ message: "Database error" })
        }
    }
}

module.exports = bookingController
