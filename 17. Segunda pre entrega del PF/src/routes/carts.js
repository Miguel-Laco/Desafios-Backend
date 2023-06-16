import { Router } from "express";
import CartDao from "../DAO/CartDao.js"

const cartRouter = Router();
const manager = new CartDao(); //Inicializo la clase

/* /////////////////////            GET           //////////////////////////// */

cartRouter.get("/", async (req, res) => {
    try {
        res.send(await manager.getCarts());
    } catch (error) {
        console.log(error);
    }
})

cartRouter.get("/:cid", async (req, res) => {
    try {
        let id = req.params.cid;
        res.send(await manager.getCartsById(id));
    } catch (error) {
        console.log(error);
    }
})

/* ////////////////////////    POST    ////////////////////////////////// */

cartRouter.post("/", async (req, res) => {
try {
    res.send(await manager.addCarts());
} catch (error) {
    console.log(error);
}
})

cartRouter.post("/:cid/products/:pid", async (req, res) =>{
res.send(await manager.addProductToCart(req.params.cid, req.params.pid));
})


export default cartRouter;




