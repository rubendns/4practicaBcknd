import transporter from '../utils.js';
import { v4 as uuidv4 } from 'uuid';
import { userService } from '../services/repository/services.js';

export const sendEmail = async (email, subject, html, attachments) => {
  try {
    if (!email || !subject || !html) {
      throw new Error('¡El email, asunto y contenido HTML son obligatorios!');
    }

    const result = await transporter.sendEmail({
      from: 'Cambio-Cambio',
      to: email,
      subject: subject,
      html: html,
      attachments: attachments
    });
    return `Correo electrónico enviado a ${email}. ID del mensaje: ${result.messageId}`;
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw error;
  }
};

export const sendForgotEmail = async (email, attachments, userId) => {
  try {
    const user = await userService.getUserByEmail(email);
    const resetToken = uuidv4();
    const resetTokenExpiration = Date.now() + 3600000;
    const resetLink = `http://127.0.0.1:8080/mailer/reset-password?token=${resetToken}&uid=${user._id}`;
    const updatedUser = await userService.updateUser(user._id, { resetToken, resetTokenExpiration });

    const result = await transporter.sendEmail({
      from: 'Cambio-Cambio',
      to: email,
      subject: 'Restablece tu contraseña',
      html: `
      <a href="${resetLink}">Restablecer contraseña</a>
    `,
      attachments: attachments
    });
    return `Correo electrónico de restablecimiento enviado. ID del mensaje: ${result.messageId}`;
  } catch (error) {
    console.error('Error al enviar el correo de restablecimiento de contraseña:', error);
    throw error;
  }
};
