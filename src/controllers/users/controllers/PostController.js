import HttpCodes from 'http-status-codes';
import { UserRepository } from '../../../repositories/UserRepository.js';
import { internalError, hashPassword } from '../../../helpers/helpers.js';

export class PostController {
  static async postUser(req, res) {
    const { body } = req;

    const hashedPassword = hashPassword(body.password);

    const userData = {
      first_name: body.first_name,
      last_name: body.last_name,
      age: body.age,
      email: body.email,
      password: hashedPassword,
    };

    try {
      await UserRepository.createUser(userData);

      return res.status(HttpCodes.CREATED).json({
        data: null,
        message: 'Usuario guardado correctamente',
      });
    } catch (e) {
      if (e.code === 11000 && e.keyPattern && e.keyPattern.email) {
        return res.status(HttpCodes.CONFLICT).json({
          data: null,
          message:
            'El email ya está registrado. Por favor, utiliza otro email.',
        });
      }
      return internalError(res, e, 'Ocurrió un error al guardar el usuario');
    }
  }
}
