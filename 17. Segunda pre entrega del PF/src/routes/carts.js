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
        let response = await manager.getCartsById(id)
        if (!response) {
            throw new Error("El Cart ID proporcionado no existe")
        }
        res.send(response);
    } catch (error) {
        throw new Error(error.message)
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

/* ////////////////////////    DELETE    ////////////////////////////////// */

// Eliminar un producto del carrito
cartRouter.delete("/:cid/products/:pid", async (req, res) => {
    try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await manager.removeProductFromCart(cartId, productId);
    res.send("Producto eliminado del carrito exitosamente");
    } catch (error) {
    console.log(error);
    }
});

// Eliminar todos los productos del carrito
cartRouter.delete("/:cid", async (req, res) => {
    try {
    const cartId = req.params.cid;
    await manager.deleteCart(cartId);
    res.send("Productos eliminados del carrito exitosamente");
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al eliminar los productos del carrito" });
    }
});

/* ////////////////////////    PUT    ////////////////////////////////// */

// Actualizar el carrito con un arreglo de productos
cartRouter.put("/:cid", async (req, res) => {
    try {
    const cartId = req.params.cid;
    const products = req.body;
    await manager.updateCart(cartId, products);
    res.send("Carrito actualizado exitosamente");
    } catch (error) {
    console.log(error);
    }
});

  // Actualizar la cantidad de un producto en el carrito
cartRouter.put("/:cid/products/:pid", async (req, res) => {
    try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;
    await manager.updateProductQuantity(cartId, productId, quantity);
    res.send("Cantidad de producto actualizada exitosamente");
    } catch (error) {
    console.log(error);
    }
});

export default cartRouter;




