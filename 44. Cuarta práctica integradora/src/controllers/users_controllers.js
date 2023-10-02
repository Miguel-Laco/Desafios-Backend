/* users_controllers.js */
import UserDao from "../DAO/UserDao.js";

const userDao = new UserDao;

const ctrl_changeUserRol = async (req, res) => {
    try {
        //Tomo el user ID por parámetros y busco el ususario
        let uid = req.params.uid;
        let user = await userDao.getByEmail(uid);
        //Reviso si el usuario tien el rol user, para validar que tenga todos los documentos subidos.
        if (user.role === "user") {
            // Valido si el usuario tiene los documentos requeridos
            const hasIdentification = user.documents.some(doc => doc.name.includes('identification'));
            const hasProofOfAddress = user.documents.some(doc => doc.name.includes('proofOfAddress'));
            const hasBankStatement = user.documents.some(doc => doc.name.includes('bankStatement'));
            // Si tiene todos los documentos, realizo el cambio de rol
            if (hasIdentification && hasProofOfAddress && hasBankStatement) {
                req.logger.info(`El usuario cuenta con la documentación apropiada.`)
                user.role === "user" ? user.role = "premium" : user.role = "user";
                req.logger.info(`Se cambió el rol de ${user.email} a: ${user.role}`);
                await user.save();
            } else {
                //Si no tiene los documentos, aviso e indico por consola, que documento le falta.
                req.logger.warning(`El usuario ${user.email} no tiene los documentos requeridos.`);
                if (!hasIdentification) {
                    req.logger.warning("Identification")
                }else if (!hasProofOfAddress){
                    req.logger.warning("ProofOfAddress")
                }else if (!hasBankStatement){
                    req.logger.warning("BankStatement")
                }
            }
            //Luego, vuelvo a cargar el perfil, actualizando el rol
            res.render('profile', { user: JSON.parse(JSON.stringify(user)), style: "profile.css" });
        }else{
            //Si es premium, permito el cambio de rol directamente.
            user.role === "user" ? user.role = "premium" : user.role = "user";
            req.logger.info(`Se cambió el rol de ${user.email} a: ${user.role}`);
            await user.save();
            res.render('profile', { user: JSON.parse(JSON.stringify(user)), style: "profile.css" });
        }

    } catch (error) {
        req.logger.error(error.message || "Error desconocido");
    }
}
const ctrl_upload_Documents = async (req, res) => {
    try {
        //Tomo los files del formulario y el user id de los parámetros
        let files = req.files
        let uid = req.params.uid
        //Llamo a la funcion del Dao que generé para subir los documentos
        await userDao.updateDocuments(uid, files)
        //Vuelvo a buscar el usuario actualizado, para enviárselo a la vista "profile"
        let user = await userDao.getByEmail(uid);
        res.render('profile', { user: JSON.parse(JSON.stringify(user)), style: "profile.css" });
        return
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al subir archivos.", error: error.message });
    }
}

const crtl_upload = async (req, res) => {
    let uid = req.params.uid;
    res.render("upload", {uid: uid})
}


export {ctrl_changeUserRol, ctrl_upload_Documents, crtl_upload};