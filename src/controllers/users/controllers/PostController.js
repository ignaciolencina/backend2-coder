import HttpCodes from 'http-status-codes';

import UserModel from '../../../models/userSchema.js';
import { internalError, hashPassword } from '../../../helpers/helpers.js';

export class PostController {
  static async postUser(req, res) {
    const { body } = req;

    const hashedPassword = hashPassword(body.password);

    const newUser = new UserModel({
      first_name: body.first_name,
      last_name: body.last_name,
      age: body.age,
      email: body.email,
      password: hashedPassword,
    });

    try {
      await newUser.save();

      res.status(HttpCodes.CREATED).json({
        data: null,
        message: 'Usuario guardado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al guardar el usuario');
    }
  }
}
