import UserModel from '../../../models/userSchema.js';
import { internalError } from '../../../helpers/helpers.js';

export class GetController {
  static async getUsers(_, res) {
    try {
      const data = await UserModel.find();

      const filteredData = data.map((user) => {
        return {
          id: user._doc._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          age: user.age,
          role: user.role,
        };
      });

      res.json({
        data: filteredData,
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
      const data = await UserModel.findOne({ _id: id });

      const filteredData = {
        id: data._id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        age: data.age,
        role: data.role,
      };

      res.json({
        data: filteredData,
        message: 'Usuario encontrado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de usuarios');
    }
  }
}
