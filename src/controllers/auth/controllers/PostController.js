import HttpCodes from 'http-status-codes';
import passport from 'passport';

import { internalError, generateToken } from '../../../helpers/helpers.js';

export class PostController {
  static async postLogin(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return internalError(res, err, 'Error en el proceso de autenticación');
      }

      if (!user) {
        return res.status(HttpCodes.UNAUTHORIZED).json({
          data: null,
          message: info.message || 'Credenciales inválidas',
        });
      }

      try {
        const token = generateToken(user);

        res.cookie('jwt', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
          sameSite: 'strict',
          maxAge: 60 * 60 * 1000, // 1 hora (igual que el token)
        });

        return res.json({
          data: {
            user,
          },
          message: 'Login exitoso',
        });
      } catch (error) {
        return internalError(res, error, 'Error al generar el token');
      }
    })(req, res, next);
  }

  static async postLogout(req, res) {
    res.clearCookie('jwt');
    return res.json({
      data: null,
      message: 'Logout exitoso',
    });
  }
}
