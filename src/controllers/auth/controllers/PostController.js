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

        return res.json({
          data: {
            user,
            token,
          },
          message: 'Login exitoso',
        });
      } catch (error) {
        return internalError(res, error, 'Error al generar el token');
      }
    })(req, res, next);
  }
}
