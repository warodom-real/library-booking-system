const app = require('./src/app')
require('./src/cronReminder')  // เพิ่มบรรทัดนี้

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})