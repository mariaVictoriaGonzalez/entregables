export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getUserByEmail = (email) => {
    return this.dao.getUserByEmail({ email });
  };

  modifyUser(email, password) {
    const user = userModel.findOne({ email: email });

    user.password = password;
    user.save();

    return user;
  }
}
