import UserModel from '../../models/userSchema.js';

export class UserDAO {
  static async findAll() {
    return UserModel.find();
  }

  static async findById(id) {
    return UserModel.findById(id);
  }

  static async findByEmail(email) {
    return UserModel.findOne({ email });
  }

  static async create(userData) {
    const newUser = new UserModel(userData);
    return newUser.save();
  }

  static async updateById(id, updateData) {
    return UserModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async deleteById(id) {
    return UserModel.findByIdAndDelete(id);
  }
}
