import passport from 'passport';

import { internalError } from '../../../helpers/helpers.js';

export class GetController {
  static async current(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) {
        return internalError(res, err, 'Error en la validación del token');
      }

      if (!user) {
        return res.status(401).json({
          data: null,
          message: 'Token inválido o expirado',
        });
      }

      return res.json({
        data: user,
        message: 'Usuario autenticado correctamente',
      });
    })(req, res, next);
  }
}
