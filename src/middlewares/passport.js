import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';

import { UserRepository } from '../repositories/UserRepository.js';
import { UserDTO } from '../dto/UserDTO.js';
import { comparePassword } from '../helpers/helpers.js';

const { SECRET_KEY } = process.env;

const extractJwtFromCookie = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.jwt;
  }
  return token;
};

// Local - Login
passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await UserRepository.getUserByEmail(email);

        if (!user) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }

        const isValidPassword = comparePassword(password, user.password);

        if (!isValidPassword) {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }

        const userDTO = UserDTO.fromUser(user);

        return done(null, userDTO);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  'current',
  new JwtStrategy(
    {
      jwtFromRequest: extractJwtFromCookie,
      secretOrKey: SECRET_KEY,
    },
    async (jwtPayload, done) => {
      try {
        const user = await UserRepository.getUserById(jwtPayload.id);

        if (!user) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }

        const userDTO = UserDTO.fromUser(user);
        return done(null, userDTO);
      } catch (error) {
        return done(error, false, { message: 'Error al validar el token' });
      }
    },
  ),
);

export default passport;
