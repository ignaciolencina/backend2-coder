import HttpCodes from 'http-status-codes';
import bcryptjs from 'bcryptjs';

export const internalError = (res, e, message = 'Ocurrió un error') => {
  console.error(e);

  res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
    data: null,
    message,
  });
};

export const hashPassword = (plainPassword) => {
  const saltRounds = 10;
  return bcryptjs.hashSync(plainPassword, saltRounds);
};

export const comparePassword = (plainPassword, hashedPassword) => {
  return bcryptjs.compareSync(plainPassword, hashedPassword);
};
