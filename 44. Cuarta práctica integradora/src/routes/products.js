/* products.js */
import { Router } from "express";
import {
    crtl_GET_Products, 
    crtl_GET_ProductId, 
    crtl_POST_Products, 
    crtl_PUT_ProductId,
    crtl_DEL_ProductId 
} from "../controllers/products_controllers.js";
import { requireAdminOrPremium, setOwner } from "../utils/jwt.js";

const productRouter = Router();


/* /////////////////////            GET           //////////////////////////// */

//Genero un query que devuelve la cantidad de productos indicado en limit o todos los productos si no se indica
productRouter.get(`/`, crtl_GET_Products)


//Entrego el ID solicitado y si no existe muestro un error
productRouter.get(`/:pid`, crtl_GET_ProductId)


/* ////////////////////////    POST    ////////////////////////////////// */
productRouter.post(`/`, requireAdminOrPremium, setOwner, crtl_POST_Products)


/* ////////////////////////    PUT    ////////////////////////////////// */
//Para cumplir con la entrega de la clase 30, agrego dos validaciones, una con passport-current y otra por middleware que valida el acceso solo al Admin.
productRouter.put(`/:id`,  requireAdminOrPremium, setOwner, crtl_PUT_ProductId)


/* ////////////////////////    DELETE    ////////////////////////////////// */
//Para cumplir con la entrega de la clase 30, agrego dos validaciones, una con passport-current y otra por middleware que valida el acceso solo al Admin.
// productRouter.delete(`/:pid`, passport.authenticate("current", { session: false }), authAdmin, crtl_DEL_ProductId)
productRouter.delete(`/:pid`, requireAdminOrPremium, setOwner, crtl_DEL_ProductId)

export default productRouter;