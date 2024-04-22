export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getUserByEmail = async (email) => {
    try {
      const user = await this.dao.getUserByEmail({email});
      return user;
    } catch (error) {
      throw new Error(`Error while fetching user by email: ${error.message}`);
    }
  };

  modifyUser = async (email, newPassword) => {
    try {
      let user = await this.dao.getUserByEmail({email});
      user.password = newPassword;
      user = await this.dao.modifyUser(user);
      return user;
    } catch (error) {
      throw new Error(`Error while modifying user: ${error.message}`);
    }
  };
}


