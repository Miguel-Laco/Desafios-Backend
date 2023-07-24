/* session.js */
import { Router } from "express";
import {authLogin, authLogout} from "../middlewares/auth.js";
import UserDao from "../DAO/UserDao.js";
import passport from "passport";
import { generateAuthToken } from "../utils/jwt.js";

const sessionRouter = Router();
const userDao = new UserDao();

sessionRouter.get('/register', authLogout, async (req, res) => {
    res.render('register', {style:"register.css"})
});

sessionRouter.post('/register', passport.authenticate("register", {failureRedirect: "/api/sessions/register-error"}), async (req, res) => {
    res.render('login');
    
});

sessionRouter.get('/register-error', async (req, res) => {
    res.render('register-error',{});
});

sessionRouter.get('/login', authLogout, async (req, res) => {
    res.redirect('/api/sessions/login');
});


sessionRouter.post('/login', passport.authenticate("login", {failureRedirect: "/api/sessions/login-error"}) ,async (req, res) => {
    if (!req.user) {
        return res.render("login-error", {});
    }
    if (req.user.email == "adminCoder@coder.com") {
        req.session.admin = true;
        req.session.user = req.user.email;
        //Agrego al inicio de sesión, un token para para la autenticación de la ruta /current, que usa passport-jwt en vez de session
        res.cookie('authToken', access_token, { httpOnly: true});
        const access_token = generateAuthToken({ email: req.user.email}) 
        return res.redirect('/products');
    } else {
        req.session.user = req.user.email;
        //Agrego al inicio de sesión, un token para para la autenticación de la ruta /current, que usa passport-jwt en vez de session
        const access_token = generateAuthToken({ email: req.user.email})
        res.cookie('authToken', access_token, { httpOnly: true});
        return res.redirect('/products');
    }
})



sessionRouter.get('/login-error', async (req, res) => {
return res.render("login-error")
});

//Genero una ruta para la autenticación con github
sessionRouter.get("/github",passport.authenticate("github", {scope:["user:email"]}), async(req,res)=>{})


sessionRouter.get("/githubcallback",passport.authenticate("github", {failureRedirect:"/api/sessions/login-error"}), async(req,res)=>{
    //En este caso, devolverá el usuario, así que lo agrego a la sesión.
    req.session.user = req.user.email;
    //Agrego al inicio de sesión, un token para para la autenticación de la ruta /current, que usa passport-jwt en vez de session
    const access_token = generateAuthToken({ email: req.user.email})
    res.cookie('authToken', access_token, { httpOnly: true});
    res.redirect("/products");
})


sessionRouter.get('/profile', authLogin, async (req, res) => {
    let user = await userDao.getByEmail(req.session.user);
    res.render('profile', {user:JSON.parse(JSON.stringify(user)), style: "profile.css"});
});




sessionRouter.get('/logout', async (req, res) => {
    
    res.clearCookie('authToken'); //Elimino la cookie que contiene el authToken
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: 'Logout ERROR', body: err })
        }
        res.redirect("/")
    })
});


// Ruta para passport-jwt (Desafío clase 24)
sessionRouter.get('/current', passport.authenticate('current', { session: false}), (req, res) => {
    res.render('current', { user: req.user.email, message: "Ingresamos mediante Passport-jwt" });
});

export default sessionRouter;