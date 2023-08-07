import { generateAuthToken } from "../utils/jwt.js";
import UserDao from "../DAO/UserDao.js";
import config from "../config/config.js";

const userDao = new UserDao();

const ctrl_GET_Register = async (req, res) => {
    res.render('register', {style:"register.css"});
};

const crtl_POST_Register = async (req, res) => {
    res.render('login');
};

const crtl_GET_Register_error = async (req, res) => {
    res.render('register-error',{});
};

const crtl_GET_Login = async (req, res) => {
    res.redirect('/api/sessions/login');
};

const crtl_POST_Login = async (req, res) => {
    if (!req.user) {
        return res.render("login-error", {});
    }
    if (req.user.email == config.ADMIN_MAIL) {
        req.session.admin = true;
        req.session.user = req.user.email;
        //Agrego al inicio de sesión, un token para para la autenticación de la ruta /current, que usa passport-jwt en vez de session
        const access_token = generateAuthToken({ email: req.user.email}) 
        res.cookie('authToken', access_token, { httpOnly: true});
        return res.redirect('/products');
    } else {
        req.session.user = req.user.email;
        //Agrego al inicio de sesión, un token para para la autenticación de la ruta /current, que usa passport-jwt en vez de session
        const access_token = generateAuthToken({ email: req.user.email})
        res.cookie('authToken', access_token, { httpOnly: true});
        return res.redirect('/products');
    }
};

const crtl_GET_Login_error = async (req, res) => {
    return res.render("login-error");
    };

const crtl_GET_Githubcallback = async(req,res)=>{
//En este caso, devolverá el usuario, así que lo agrego a la sesión.
    req.session.user = req.user.email;
    //Agrego al inicio de sesión, un token para para la autenticación de la ruta /current, que usa passport-jwt en vez de session
    const access_token = generateAuthToken({ email: req.user.email});
    res.cookie('authToken', access_token, { httpOnly: true});
    res.redirect("/products");
};

const crtl_GET_Profile = async (req, res) => {
    let user = await userDao.getByEmail(req.session.user);
    res.render('profile', {user:JSON.parse(JSON.stringify(user)), style: "profile.css"});
};

const crtl_GET_Logout = async (req, res) => {
    
    res.clearCookie('authToken'); //Elimino la cookie que contiene el authToken
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: 'Logout ERROR', body: err });
        };
        res.redirect("/");
    });
};

const crtl_GET_Current = (req, res) => {
    res.render('current', { user: req.user.email, message: "Ingresamos mediante Passport-jwt" });
};

export {ctrl_GET_Register, crtl_POST_Register, crtl_GET_Register_error, crtl_GET_Login, crtl_POST_Login, crtl_GET_Login_error, crtl_GET_Githubcallback, crtl_GET_Profile, crtl_GET_Logout, crtl_GET_Current}
