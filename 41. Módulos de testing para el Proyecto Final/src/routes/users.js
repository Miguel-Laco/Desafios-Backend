import { Router } from "express";
import { 
    ctrl_changeUserRol 
} from "../controllers/users_controllers.js";


const usersRouter = Router();

//Creo una ruta para cambiar el rol de usar a premium y al reves
usersRouter.get("/premium/:uid", ctrl_changeUserRol)



export default usersRouter;