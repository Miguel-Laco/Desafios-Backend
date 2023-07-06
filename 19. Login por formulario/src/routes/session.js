import { Router } from "express";
import {authLogin, authLogout} from "../middlewares/auth.js";
import UserDao from "../DAO/UserDao.js";

const sessionRouter = Router();
const userDao = new UserDao();

sessionRouter.get('/register', authLogout, async (req, res) => {
    res.render('register', {style:"register.css"})
});

sessionRouter.post('/register', async (req, res) => {
    let user = req.body; //Levanto la información del body
    let userFound = await userDao.getByEmail(user.email); //Valido si el mail, existe en la DB
    if(userFound){
        //Si existe en la DB, devuelvo un error avisando que ya existe.
        res.render('register-error', { message: `El usuario con el correo: ${user.email}, ya existe` });
    }else{
        //Si no existe, creo el usuario y redirijo a Login
        let result = await userDao.createUser(user)
        res.redirect('/api/sessions/login');
    }
    
});

sessionRouter.get('/login', authLogout, async (req, res) => {
    res.render('login', {style:"login.css"})
});

sessionRouter.post('/login', async (req, res) => {
    let user = req.body; //Levanto la información del body
    //Valido si el usuario ingresado es el Admin
    if (user.email === 'adminCoder@coder.com' && user.password === 'adminCod3r123'){
        req.session.admin=true;
        req.session.user = user.email;
        return res.redirect('/products');
    }
    //Si no es el admin, busco en la DB el usuario
    let result = await userDao.getByEmail(user.email) 
        if (!result){
        return res.render('login-error',{message:'El usuario no existe'})
        }
        if(user.password == result.password && user.email == result.email){
            req.session.user = result.email;
            res.redirect('/products');
            }else{
            res.render('login-error',{message:'La clave no coincide con la registrada'})
        }
})


sessionRouter.get('/profile', authLogin, async (req, res) => {
    let user = await userDao.getByEmail(req.session.user);
    res.render('profile', {user:JSON.parse(JSON.stringify(user)), style: "profile.css"});
});

sessionRouter.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: 'Logout ERROR', body: err })
        }
        res.redirect("/")
    })
});

export default sessionRouter;