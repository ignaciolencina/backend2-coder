import { transporter } from '../config/emailConfig.js';

export class EmailService {
  static async sendPasswordResetEmail(userEmail, resetToken) {
    const resetUrl = `http://localhost:5050/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Recuperación de Contraseña',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h2 style="color: #333;">Recuperación de Contraseña</h2>
          <p>Hola,</p>
          <p>Has solicitado recuperar tu contraseña. Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Restablecer Contraseña
            </a>
          </div>
          <p><strong>Este enlace expirará en 1 hora.</strong></p>
          <p>Si no solicitaste este cambio, puedes ignorar este email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
            <a href="${resetUrl}">${resetUrl}</a>
          </p>
        </div>
      `,
      text: `
        Recuperación de Contraseña
        
        Has solicitado recuperar tu contraseña. 
        Visita el siguiente enlace para crear una nueva contraseña:
        ${resetUrl}
        
        Este enlace expirará en 1 hora.
        Si no solicitaste este cambio, puedes ignorar este email.
      `,
    };

    return transporter.sendMail(mailOptions);
  }

  static async sendPasswordResetConfirmation(userEmail) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Contraseña Actualizada',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h2 style="color: #28a745;">¡Contraseña Actualizada!</h2>
          <p>Hola,</p>
          <p>Tu contraseña ha sido actualizada exitosamente.</p>
          <p>Si no fuiste tú quien hizo este cambio, contacta inmediatamente a nuestro soporte.</p>
          <p>Saludos,<br>El equipo de soporte</p>
        </div>
      `,
      text: `
        ¡Contraseña Actualizada!
        
        Tu contraseña ha sido actualizada exitosamente.
        Si no fuiste tú quien hizo este cambio, contacta inmediatamente a nuestro soporte.
        
        Saludos,
        El equipo de soporte
      `,
    };

    return transporter.sendMail(mailOptions);
  }
}
