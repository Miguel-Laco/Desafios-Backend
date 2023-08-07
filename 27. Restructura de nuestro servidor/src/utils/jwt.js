import jwt from "jsonwebtoken";
import config from "../config/config.js";


const JWT_PRIVATE_KEY = config.JWT_PRIVATE_KEY  //Luego traer de variable entorno.

export const generateAuthToken = (user) => {
    const token = jwt.sign(user, JWT_PRIVATE_KEY, {expiresIn: "24h"})
    return token;
};

export const authToken = (req, res, next) => {
    const authHeaders = req.headers.Authorization ? req.headers.Authorization : req.headers.authorization;
    if (!authHeaders) return res.status(401).send ({error: "Not authorized"}) //Si no hay headers, es porque no hay token y por lo tanto no está autenticado
    const token = authHeaders.split(" ")[1]; //Se hace un split para retirar la palabra "Bearer"
    jwt.verify(token, JWT_PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({error: "Not authorized"})
        //Si todo está en orden, se descifra correctamente el token y se envía el usuario
        req.user = credentials.user;
        next();
    })
};