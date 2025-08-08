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

  static async findByResetToken(token) {
    return UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  }

  static async updateResetToken(email, token, expires) {
    return UserModel.findOneAndUpdate(
      { email },
      { resetPasswordToken: token, resetPasswordExpires: expires },
      { new: true },
    );
  }

  static async clearResetToken(id) {
    return UserModel.findByIdAndUpdate(
      id,
      {
        $unset: {
          resetPasswordToken: 1,
          resetPasswordExpires: 1,
        },
      },
      { new: true },
    );
  }
}
