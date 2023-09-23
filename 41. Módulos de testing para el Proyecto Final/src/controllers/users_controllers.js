import UserDao from "../DAO/UserDao.js";

const userDao = new UserDao;

const ctrl_changeUserRol = async (req, res) => {
    try {
        let uid = req.params.uid;
        let user = await userDao.getByEmail(uid);
        //Cambio automáticamente el role del usuario
        user.role === "user" ? user.role = "premium" : user.role = "user";
        req.logger.info(`Se cambió el rol de ${user.email} a: ${user.role}`);
        await user.save();
        res.render('profile', {user:JSON.parse(JSON.stringify(user)), style: "profile.css"});
    } catch (error) {
        req.logger.error(error)
    }
}

export {ctrl_changeUserRol};