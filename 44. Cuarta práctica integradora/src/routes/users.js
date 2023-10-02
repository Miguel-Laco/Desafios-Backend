/* users.js */
import { Router } from "express";
import { 
    ctrl_changeUserRol,
    ctrl_upload_Documents,
    crtl_upload
} from "../controllers/users_controllers.js";
import upload from "../utils/upload.js";


const usersRouter = Router();

//Creo una ruta para cambiar el rol de usar a premium y al reves
usersRouter.get("/premium/:uid", ctrl_changeUserRol)

//Creo una ruta que permite subir documentos de los usuarios
usersRouter.post("/:uid/documents",upload.any(), ctrl_upload_Documents)

//Creo una ruta para mostrar una vista
usersRouter.get("/upload/:uid", crtl_upload)



export default usersRouter;