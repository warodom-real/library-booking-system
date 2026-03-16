const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "koboro03@gmail.com",
        pass: "lxpk xsps yhya yact"
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