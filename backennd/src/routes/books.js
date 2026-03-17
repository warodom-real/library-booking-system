const express = require('express')
const router = express.Router()
const multer = require('multer')
const booksController = require('../controllers/booksController')
const { verifyAdmin } = require('../middleware/authMiddleware')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

// Public routes
router.get('/', booksController.getAll)
router.get('/available', booksController.getAvailable)
router.get('/category/:id', booksController.getByCategory)
router.get('/:id', booksController.getById)

// Admin only routes
router.post('/add', verifyAdmin, upload.single('book_images'), booksController.create)
router.put('/status/:id', verifyAdmin, booksController.updateStatus)
router.put('/:id', verifyAdmin, upload.single('book_images'), booksController.update)
router.delete('/:id', verifyAdmin, booksController.delete)

module.exports = router
