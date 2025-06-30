import HttpCodes from 'http-status-codes';

export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(HttpCodes.UNAUTHORIZED).json({
        data: null,
        message: 'Acceso no autorizado',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(HttpCodes.FORBIDDEN).json({
        data: null,
        message: 'No tienes permisos para el acceso',
      });
    }

    return next();
  };
};
