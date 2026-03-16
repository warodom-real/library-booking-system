const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "library.booking.system.project@gmail.com",
        pass: "tbee nunj yrkf ppwj"
    }
});

async function sendReminder(email, book, date) {
    let template = fs.readFileSync(path.join(__dirname, "emailTemplate.html"), "utf8");

    const formattedDate = new Date(date).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    template = template.replace("{{book}}", book);
    template = template.replace("{{date}}", formattedDate);

    await transporter.sendMail({
        from: '"Library Booking System" <library.booking.system.project@gmail.com>',
        to: email,
        subject: "แจ้งเตือนคืนหนังสือ",
        html: template
    });
}

async function sendThankYou(email, book) {
    let template = fs.readFileSync(path.join(__dirname, "thankYouTemplate.html"), "utf8");
    
    template = template.replace("{{book}}", book);

    await transporter.sendMail({
        from: '"Library Booking System" <library.booking.system.project@gmail.com>',
        to: email,
        subject: "ขอบคุณที่ใช้บริการ",
        html: template
    });
}

module.exports = { sendReminder, sendThankYou };