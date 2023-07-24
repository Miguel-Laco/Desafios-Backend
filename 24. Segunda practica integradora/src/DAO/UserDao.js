/* UserDao.js */
import {usersModel} from "./model/users.model.js"
import CartDao from "./CartDao.js"

const cartManager = new CartDao();

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
      let cart = await cartManager.addCarts();
      console.log("LOG DE CART"+cart);
      let newUser = {
        first_name: user.first_name, // Tomar el nombre del usuario del cuerpo de la solicitud
        last_name: user.last_name, // Tomar el apellido del usuario del cuerpo de la solicitud
        age: user.age, // Campo que no trae el perfil
        email: user.email, // Tomar el email del usuario del cuerpo de la solicitud
        password: user.password, // Tomar la contraseña del usuario del cuerpo de la solicitud y hashearla
        cart: cart._id, // Asignar un carrito vacío al nuevo usuario
    }
    let result = await usersModel.create(newUser);
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