import { Router } from "express";
import CartManager from "../CartManager.js";

const cartRouter = Router();
const cart = new CartManager(); //Inicializo la clase

/* /////////////////////            GET           //////////////////////////// */

cartRouter.get("/", async (req, res) => {
    try {
        res.send(await cart.readCarts());
    } catch (error) {
        console.log(error);
    }
})

cartRouter.get("/:cid", async (req, res) => {
    try {
        let id = req.params.cid;
        res.send(await cart.getCartsById(id));
    } catch (error) {
        console.log(error);
    }
})

/* ////////////////////////    POST    ////////////////////////////////// */

cartRouter.post("/", async (req, res) => {
try {
    res.send(await cart.addCarts());
} catch (error) {
    console.log(error);
}
})

cartRouter.post("/:cid/products/:pid", async (req, res) =>{
res.send(await cart.addProductToCart(req.params.cid, req.params.pid));
})


export default cartRouter;




