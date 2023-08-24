/* utils.js */
import bcrypt from "bcrypt";
import config from "../config/config.js";

//Utilizo bcrypt para encriptar el password que se almacenará en DB
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//Creo una función que permite validar el password ingresado por el usuario, contra el almacenado encriptado.
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

//Creo una función toma la cookie que le indiquemos y extrae el token
export const cookieExtrator = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies[config.AUTH_TOKEN];
    }
    console.log("Token extraído:", token); // Agrega este registro
    return token;
};
