import nodemailer from 'nodemailer';

const { EMAIL_USER, EMAIL_PASSWORD, EMAIL_SERVICE } = process.env;

export const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE || 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error('Error configurando email:', error);
  } else {
    console.log('📧 Servidor de email configurado correctamente');
  }
});
