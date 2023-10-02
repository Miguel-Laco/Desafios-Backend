/* routes carts.js */
import { Router } from "express";
import {
    crtl_GET_Cart,
    crtl_GET_CartId,
    crtl_POST_Cart,
    crtl_POST_ProdOnCart,
    crtl_DEL_ProdOnCart,
    crtl_DEL_CartId,
    crtl_PUT_CartId,
    crtl_PUT_ProdOnCart,
    crtl_POST_purchase
} from "../controllers/carts_controllers.js";
import { authToken } from "../utils/jwt.js";
import { setOwner } from "../utils/jwt.js";

const cartRouter = Router();

/* /////////////////////            GET           //////////////////////////// */

cartRouter.get("/", crtl_GET_Cart)

cartRouter.get("/:cid", authToken, crtl_GET_CartId)

/* ////////////////////////    POST    ////////////////////////////////// */

cartRouter.post("/", crtl_POST_Cart)

cartRouter.post("/:cid/products/:pid", authToken, setOwner, crtl_POST_ProdOnCart)

//Genero una ruta para finalizar el proceso de compra del carrito.
cartRouter.post("/:cid/purchase", crtl_POST_purchase)

/* ////////////////////////    DELETE    ////////////////////////////////// */

// Eliminar un producto del carrito
cartRouter.delete("/:cid/products/:pid", crtl_DEL_ProdOnCart);

// Eliminar todos los productos del carrito
cartRouter.delete("/:cid", crtl_DEL_CartId);

/* ////////////////////////    PUT    ////////////////////////////////// */

// Actualizar el carrito con un arreglo de productos
cartRouter.put("/:cid", crtl_PUT_CartId);

  // Actualizar la cantidad de un producto en el carrito
cartRouter.put("/:cid/products/:pid", crtl_PUT_ProdOnCart);

export default cartRouter;




