const nodemailer = require('nodemailer');

const args = process.argv.slice(2);
const subject = args[0] || 'Notificación CircleCI';
const message = args[1] || 'Mensaje de notificación';

async function sendMail() {
    let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
    });

    let info = await transporter.sendMail({
    from: `"CI Bot" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_TO,
    subject,
    text: message,
    });

    console.log('Mensaje enviado:', info.messageId);
}

sendMail().catch(console.error);
