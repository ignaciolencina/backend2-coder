import passport from 'passport';

import { internalError } from '../../../helpers/helpers.js';

export class GetController {
  static async current(req, res, next) {
    passport.authenticate('current', { session: false }, (err, user, info) => {
      if (err) {
        return internalError(res, err, 'Error en la validación del token');
      }

      if (!user) {
        return res.status(401).json({
          data: null,
          message:
            info?.message ||
            'Token inválido, expirado o no proporcionado en la cookie',
        });
      }

      return res.json({
        data: user,
        message: 'Usuario autenticado correctamente',
      });
    })(req, res, next);
  }
}
