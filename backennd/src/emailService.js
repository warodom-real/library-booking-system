const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "library.booking.system.project@gmail.com",
        pass: "tbee nunj yrkf ppwj"
    }
});

async function sendReminder(email, book, date) {

    await transporter.sendMail({
        from: '"Library Booking System" <library.system@gmail.com>',
        to: email,
        subject: "แจ้งเตือนคืนหนังสือ",
        text: `หนังสือ ${book} จะครบกำหนดคืนวันที่ ${date}`
    });

}

module.exports = sendReminder;