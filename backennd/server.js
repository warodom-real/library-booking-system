const app = require('./src/app')
const cron = require('node-cron')
const db = require('./src/db')
const sendReminder = require("./src/cronReminder");

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})

