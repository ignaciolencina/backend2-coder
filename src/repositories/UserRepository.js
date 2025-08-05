import { UserDAO } from '../dao/mongo/UserDAO.js';
import { UserDTO } from '../dto/UserDTO.js';

export class UserRepository {
  static async getAllUsers() {
    const users = await UserDAO.findAll();
    return UserDTO.fromUsers(users);
  }

  static async getUserById(id) {
    const user = await UserDAO.findById(id);
    return user ? UserDTO.fromUser(user) : null;
  }

  static async getUserByEmail(email) {
    return UserDAO.findByEmail(email);
  }

  static async createUser(userData) {
    const newUser = await UserDAO.create(userData);
    return UserDTO.fromUser(newUser);
  }

  static async updateUser(id, updateData) {
    const updatedUser = await UserDAO.updateById(id, updateData);
    return updatedUser ? UserDTO.fromUser(updatedUser) : null;
  }
}
