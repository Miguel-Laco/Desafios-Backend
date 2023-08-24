/* Middlewares de validaciones */
import UserDao from "../DAO/UserDao.js";

const userDao = new UserDao();



//Valido si tiene una sesion activa y si la tiene, lo redirjo al perfil para que desolguee
  export let authLogout = (req, res, next) => {
    if (!req.session.user) {
      next();
    } else {
      console.log("Fallo Auth");
      res.render('profile', {style:"login.css", message:'Debe desloguear la sesión actual para volver a ingresar al Login o Register'})
      return;
    }
  };

  //Valido si tiene una sesion activa para dejarlo pasar o dirijirlo a la pantalla de login y matar cualquier sesion activa por las dudas
  export let authLogin = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      console.log("Fallo Auth");
      req.session.destroy();
      res.render('login', {style:"login.css",  message:'Debe Loguearse primero!'})
      return;
    }
  };

  //Genero un middleware que permite el acceso solo al Admin a una ruta
  export let authAdmin = async (req, res, next) => {
    if (req.session.admin === true) {
      // El usuario es administrador, permitir el acceso
      next();
  } else {
      // El usuario no es administrador, denegar el acceso
      res.status(403).json({ error: 'Access denied. Only admins can access this resource.' });
  }
  }

  //Genero un middleware que evite el aceso del Admin a una ruta y permite solo al user
  export let authUser = async (req, res, next) => {
    if (req.session.admin != true) {
      // El usuario es administrador, permitir el acceso
      next();
  } else {
      // El usuario no es administrador, denegar el acceso
      res.status(403).json({ error: 'Access denied. Only users can access this resource.' });
  }
  }
