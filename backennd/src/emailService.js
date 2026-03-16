const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "fromginkhowtv@gmail.com",
        pass: "aidb hgjc bubg yabp"
    }
});

async function sendReminder(email, book, date) {

    await transporter.sendMail({
        from: "Library System",
        to: email,
        subject: "แจ้งเตือนคืนหนังสือ",
        text: `หนังสือ ${book} จะครบกำหนดคืนวันที่ ${date}`
    });

}

module.exports = sendReminder;