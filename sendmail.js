const nodemailer = require('nodemailer');

const args = process.argv.slice(2);
const subject = args[0] || 'Notificación CircleCI';
const message = args[1] || 'Mensaje de notificación';

async function sendMail() {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,       // SSL
      requireTLS: true,   // TLS
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"CI Notifier" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_TO,
      subject,
      text: message,
    });

    console.log('📧 Correo enviado correctamente:', info.messageId);
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error.message);
    process.exit(1);
  }
}

sendMail();