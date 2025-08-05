import { UserRepository } from '../../../repositories/UserRepository.js';
import { internalError } from '../../../helpers/helpers.js';

export class GetController {
  static async getUsers(_, res) {
    try {
      const users = await UserRepository.getAllUsers();

      res.json({
        data: users,
        message: 'Usuarios encontrados correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de usuarios');
    }
  }

  static async getUser(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const user = await UserRepository.getUserById(id);

      if (!user) {
        return res.status(404).json({
          data: null,
          message: 'Usuario no encontrado',
        });
      }

      return res.json({
        data: user,
        message: 'Usuario encontrado correctamente',
      });
    } catch (e) {
      return internalError(res, e, 'Ocurrió un error al buscar el usuario');
    }
  }
}
