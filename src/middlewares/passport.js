import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';

import UserModel from '../models/userSchema.js';
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
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }

        const isValidPassword = comparePassword(password, user.password);

        if (!isValidPassword) {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }

        const userWithoutPassword = {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          age: user.age,
          role: user.role,
        };

        return done(null, userWithoutPassword);
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
        const user = await UserModel.findById(jwtPayload.id);

        if (!user) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }

        const userWithoutPassword = {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          age: user.age,
          role: user.role,
        };
        return done(null, userWithoutPassword);
      } catch (error) {
        return done(error, false, { message: 'Error al validar el token' });
      }
    },
  ),
);

export default passport;
