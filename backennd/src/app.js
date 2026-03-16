const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(bodyparser.json())
app.use(cors())

// ให้ backend อ่านไฟล์ frontend
app.use(express.static(path.join(__dirname, '../../frontend')))
app.use('/uploads', express.static('uploads'))
// เรียก route users
app.use('/users', require('./routes/users'))
app.use('/books', require('./routes/books'))
app.use('/booking', require('./routes/booking'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/login.html'))
})

module.exports = app

