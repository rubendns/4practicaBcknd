export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAllUsers = () => {
    return this.dao.getAllUsers();
  }

  getUserById = (id) => {
    return this.dao.getUserById(id);
  }

  getUserByEmail = (email) => {
    return this.dao.getUserByEmail(email);
  }

  createUser = (user) => {
    return this.dao.createUser(user);
  }

  updateUser = (id, user) => {
    return this.dao.updateUser(id, user);
  }

  deleteUser = (id) => {  
    return this.dao.deleteUser(id);
  }

}