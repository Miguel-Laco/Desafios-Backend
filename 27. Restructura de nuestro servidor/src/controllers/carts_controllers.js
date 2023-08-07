import CartDao from "../DAO/CartDao.js"

const manager = new CartDao(); //Inicializo la clase

const crtl_GET_Cart = async (req, res) => {
    try {
        res.send(await manager.getCarts());
    } catch (error) {
        console.log(error);
    }
};

const crtl_GET_CartId = async (req, res) => {
    try {
        let id = req.params.cid;
        let response = await manager.getCartsById(id);
        if (!response) {
            throw new Error("El Cart ID proporcionado no existe");
        }
        res.send(response);
    } catch (error) {
        throw new Error(error.message);
    }
};

const crtl_POST_Cart = async (req, res) => {
    try {
        res.send(await manager.addCarts());
    } catch (error) {
        console.log(error);
    }
};

const crtl_POST_ProdOnCart = async (req, res) =>{
    res.send(await manager.addProductToCart(req.params.cid, req.params.pid));
}

const crtl_DEL_ProdOnCart = async (req, res) => {
    try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await manager.removeProductFromCart(cartId, productId);
    res.send("Producto eliminado del carrito exitosamente");
    } catch (error) {
    console.log(error);
    }
};

const crtl_DEL_CartId = async (req, res) => {
    try {
    const cartId = req.params.cid;
    await manager.deleteCart(cartId);
    res.send("Productos eliminados del carrito exitosamente");
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al eliminar los productos del carrito" });
    }
}

const crtl_PUT_CartId = async (req, res) => {
    try {
    const cartId = req.params.cid;
    const products = req.body;
    await manager.updateCart(cartId, products);
    res.send("Carrito actualizado exitosamente");
    } catch (error) {
    console.log(error);
    }
};

const crtl_PUT_ProdOnCart = async (req, res) => {
    try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;
    await manager.updateProductQuantity(cartId, productId, quantity);
    res.send("Cantidad de producto actualizada exitosamente");
    } catch (error) {
    console.log(error);
    }
};

export {crtl_DEL_CartId, crtl_GET_CartId, crtl_DEL_ProdOnCart, crtl_POST_ProdOnCart, crtl_PUT_ProdOnCart, crtl_GET_Cart, crtl_POST_Cart, crtl_PUT_CartId}

