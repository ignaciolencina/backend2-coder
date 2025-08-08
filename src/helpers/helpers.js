import HttpCodes from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const { SECRET_KEY } = process.env;

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

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, SECRET_KEY, options);
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

export const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const getResetTokenExpiration = () => {
  return new Date(Date.now() + 3600000); // 1 hora desde ahora
};
