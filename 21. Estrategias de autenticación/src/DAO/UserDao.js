/* UserDao.js */
import {usersModel} from "./model/users.model.js"

class UserDao{
    constructor(){
        this.model = usersModel;
    }


    async getByEmail(email) {
        try {
          let result = await usersModel.findOne({ email: email });
          return result;
        } catch (error) {
          console.error(`Error al buscar el usuario con el correo: ${email}`);
          return null;
        }
      }

async createUser (user) {
    try {
        let result = await usersModel.create(user)
        return result;
    } catch (error) {
        return {status:"Error", msg:`No pudo crearse el usuario ${user}`}
    }
}

async getById(email) {
    try {
      let result = await usersModel.findOne({ email});
      return result; 
    } catch (error) {
      console.log(error);
      return null;
    }
  }


}

export default UserDao;