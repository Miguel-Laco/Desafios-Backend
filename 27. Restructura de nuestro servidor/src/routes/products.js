import { Router } from "express";
import {
    crtl_GET_Products, 
    crtl_GET_ProductId, 
    crtl_POST_Products, 
    crtl_PUT_ProductId,
    crtl_DEL_ProductId 
} from "../controllers/products_controllers.js"

const productRouter = Router();


/* /////////////////////            GET           //////////////////////////// */

//Genero un query que devuelve la cantidad de productos indicado en limit o todos los productos si no se indica
productRouter.get(`/`, crtl_GET_Products)


//Entrego el ID solicitado y si no existe muestro un error
productRouter.get(`/:pid`, crtl_GET_ProductId)

/* ////////////////////////    POST    ////////////////////////////////// */


productRouter.post(`/`, crtl_POST_Products)


/* ////////////////////////    PUT    ////////////////////////////////// */

productRouter.put(`/:id`, crtl_PUT_ProductId)


/* ////////////////////////    DELETE    ////////////////////////////////// */


productRouter.delete(`/:pid`,crtl_DEL_ProductId)

export default productRouter;