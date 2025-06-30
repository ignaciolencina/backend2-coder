import HttpCodes from 'http-status-codes';

export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    // Verificar que el usuario esté autenticado primero
    if (!req.user) {
      return res.status(HttpCodes.UNAUTHORIZED).json({
        data: null,
        message: 'Acceso no autorizado',
      });
    }

    // Verificar si el usuario tiene el rol requerido
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(HttpCodes.FORBIDDEN).json({
        data: null,
        message: 'No tienes permisos para el acceso',
      });
    }

    next();
  };
};
