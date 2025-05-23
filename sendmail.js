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

    await transporter.sendMail({
        from: `"CI Notifier" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_RECEIVER,
        subject,
        text: message,
    });

    console.log('📧 Correo enviado correctamente');
}

sendMail().catch((error) => {
    console.error('❌ Error al enviar el correo:', error);
    process.exit(1);
});
