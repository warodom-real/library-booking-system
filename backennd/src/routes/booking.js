const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/bookingController')
const { verifyToken } = require('../middleware/authMiddleware')

router.get('/', verifyToken, bookingController.getBorrowed)
router.post('/borrow', verifyToken, bookingController.borrow)
router.post('/return', verifyToken, bookingController.returnBook)
router.get('/history/:user_id', verifyToken, bookingController.getHistory)

module.exports = router
