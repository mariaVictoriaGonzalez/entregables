import { userModel } from "../models/user.model.js";

export default class UsersService {
  async getUserByEmail(email) {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      throw new Error(`Error while fetching user by email: ${error.message}`);
    }
  }
}
