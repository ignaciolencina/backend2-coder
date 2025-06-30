import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import UserModel from '../models/userSchema.js';
import { comparePassword } from '../helpers/helpers.js';

const { SECRET_KEY } = process.env;

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

// JWT - Tokens
passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
    },
    async (jwtPayload, done) => {
      try {
        const user = await UserModel.findById(jwtPayload.id);

        if (!user) {
          return done(null, false);
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

export default passport;
