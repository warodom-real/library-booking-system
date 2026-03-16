const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "youremail@gmail.com",
        pass: "app-password"
    }
});

async function sendReminder(email, bookName, endDate) {

    await transporter.sendMail({
        from: "Library System",
        to: email,
        subject: "แจ้งเตือนคืนหนังสือ",
        text: `หนังสือ "${bookName}" จะครบกำหนดคืนในวันที่ ${endDate}`
    });

}

module.exports = sendReminder;