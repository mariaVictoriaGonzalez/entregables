import { userModel } from "../../models/user.model.js";

export default class UsersServiceDao {
  async getUserByEmail(email) {
    try {
      return await userModel.findOne({email:email});
    } catch (error) {
      throw new Error(`Error while fetching user by email: ${error.message}`);
    }
  }

  async modifyUser(email, newPassword) {
    try {
      // Find the user by their email address
      const user = await userModel.findOne({email:email});

      if (!user) {
        throw new Error("User not found");
      }

      // Modify the user's password
      user.password = newPassword;

      // Save the updated user object
      const modifiedUser = await user.save();
      console.log("User modified:", modifiedUser);

      return modifiedUser; // Return the modified user object
    } catch (error) {
      console.error("Error modifying user:", error.message);
      throw new Error(`Error while modifying user: ${error.message}`);
    }
  }
}
