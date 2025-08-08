import HttpCodes from 'http-status-codes';
import { UserRepository } from '../../../repositories/UserRepository.js';
import { EmailService } from '../../../services/EmailService.js';
import {
  internalError,
  generateResetToken,
  getResetTokenExpiration,
  hashPassword,
} from '../../../helpers/helpers.js';

export class PasswordResetController {
  static async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await UserRepository.getUserByEmail(email);

      if (!user) {
        return res.json({
          data: null,
          message:
            'Si el email existe, recibirás las instrucciones para recuperar tu contraseña',
        });
      }

      const resetToken = generateResetToken();
      const resetTokenExpiration = getResetTokenExpiration();

      await UserRepository.updateResetToken(
        email,
        resetToken,
        resetTokenExpiration,
      );

      await EmailService.sendPasswordResetEmail(email, resetToken);

      return res.json({
        data: null,
        message:
          'Si el email existe, recibirás las instrucciones para recuperar tu contraseña',
      });
    } catch (error) {
      return internalError(
        res,
        error,
        'Error al procesar la solicitud de recuperación',
      );
    }
  }

  static async resetPassword(req, res) {
    const { token, newPassword } = req.body;

    try {
      const user = await UserRepository.getUserByResetToken(token);

      if (!user) {
        return res.status(HttpCodes.BAD_REQUEST).json({
          data: null,
          message: 'Token inválido o expirado',
        });
      }

      const hashedPassword = hashPassword(newPassword);

      await UserRepository.updateUser(user._id, { password: hashedPassword });
      await UserRepository.clearResetToken(user._id);

      await EmailService.sendPasswordResetConfirmation(user.email);

      return res.json({
        data: null,
        message: 'Contraseña actualizada exitosamente',
      });
    } catch (error) {
      return internalError(res, error, 'Error al restablecer la contraseña');
    }
  }
}
