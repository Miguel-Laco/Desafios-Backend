/* passport.config.js */
import passport from "passport";
import local from "passport-local";
import GithubStrategy from "passport-github2";
import UserDao from "../DAO/UserDao.js";
import { isValidPassword, createHash, cookieExtrator } from "../Utils/utils.js";
import jwt from "passport-jwt";
import config from "./config.js";
import CartDao from "../DAO/CartDao.js"

const cartManager = new CartDao();
const LocalStrategy = local.Strategy;
const userDao = new UserDao();
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {

passport.use("register", new LocalStrategy(
    {passReqToCallback:true, usernameField:"email"}, async (req,username,password,done)=>{
        try {
            let user = req.body; //Levanto la información del body
            let userFound = await userDao.getByEmail(user.email); //Valido si el mail, existe en la DB
            if(userFound){
                //Si existe en la DB, devuelvo un error avisando que ya existe.
                console.log("User already exists");
                return done(null,false);
            }else{
                //Si no existe, creo el usuario y redirijo a Login
                user.password = createHash(password)
                let result = await userDao.createUser(user)
                console.log(result);
                return done(null, result);
            }
        } catch (error) {
            return done("Error al obtener el usuario: " + error)
        }
    }))


    passport.use("login", new LocalStrategy({usernameField: "email"}, async (username, password, done) => {
        try {
            // Validar si el usuario ingresado es el Admin
            if (username === config.ADMIN_MAIL && password === config.ADMIN_PASSWORD) {
                return done(null, { email: username, password });
            }
            
            // Si no es el admin, busco en la DB el usuario
            let result = await userDao.getByEmail(username);
            
            if (!result || !isValidPassword(result, password) || username !== result.email) {
                return done(null, false);
            }
            // Actualizar la asignación de req.session.user a username
            return done(null, { email: username });
        } catch (error) {
            return done(error);
        }
    }));

    passport.use("github", new GithubStrategy({
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_API_KEY,
        callbackURL: config.GITHUB_CALLBACK_URL,
        scope:[config.GITHUB_SCOPE]
    }, async (accessToken,refreshToken,profile,done)=>{
        try {
            console.log(profile); //Muestro toda la info que llega del perfil
            let userMail = profile.emails[0].value;
            let user = await userDao.getByEmail(userMail)
            let cart = await cartManager.addCarts();
            const fullName = profile._json.name; //Almaceno en una variable el nombre completo
            const words = fullName.split(" "); //Separo el nombre por el espacio
            const first = words[0]; //Almaceno la primer palabra como nombre
            const second = words.slice(1).join(" "); //Tomo el resto de las palabras como apellido
            if (!user) { //Si no existe el usuario en la DB, lo creo y lo agrego
                let newUser = {
                    first_name:first,
                    last_name:second,
                    age:0, //Campo que no trae el perfil
                    email:userMail,
                    password:"", //Al ser autenticación de terceros, no asigno un password
                    cart: cart._id // Asignar un carrito vacío al nuevo usuario
                }
                let result = await userDao.createUser(newUser);
                done(null,result);
            }else{
                //Si entra acá, es porque ya existe el usuario
                done(null,user);
            }
        } catch (error) {
            return done(error)
        }
    }
    ))

    passport.use("current", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtrator]),
        secretOrKey: config.JWT_PRIVATE_KEY,
    }, async (jwt_payload, done) => {
        try {
            console.log("Token verificado correctamente", jwt_payload);
            return done(null, jwt_payload);
        } catch (error) {
            console.error("Error al verificar el token:", error);
            return done(error);
        }
    }))
    

passport.serializeUser((user, done) => {
      done(null, user.email); // Utilizar el correo electrónico como identificador único
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userDao.getById(id);
      done(null, user); // Agrega esta línea para pasar el usuario encontrado
    } catch (error) {
      done(error); // Agrega esta línea para pasar cualquier error
    }
  });

}

export default initializePassport;