/* Middlewares de validaciones */


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

 