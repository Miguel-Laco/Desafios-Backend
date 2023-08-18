/* carts_controller.js */
import CartDao from "../DAO/CartDao.js"
import ProductDao from "../DAO/ProductDao.js";
import TicketDao from "../DAO/TicketsDao.js";

const manager = new CartDao(); //Inicializo la clase
const productManager = new ProductDao();
const ticketManager = new TicketDao();

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

//Estoy trabajando en esta función
const crtl_POST_purchase = async (req, res) => {
    try {
        console.log(req.session);
        const purchaser = req.body.user
        const cartId = req.params.cid;
        const cart = await manager.getCartsById(cartId);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        const productsToPurchase = [];
        const productsToKeep = [];

        for (const cartItem of cart[0].cart) {
            const product = await productManager.getProductsById(cartItem.product._id);

            if (!product) {
                productsToKeep.push(cartItem);
                console.log("NO se encontró el producto:  " + cartItem.product._id);
                continue;
            }

            if (product.stock < cartItem.quantity) {
                productsToKeep.push(cartItem);
                console.log("No queda STOCK del producto:  " + cartItem.product._id);
                continue;
            }

            // Resta la cantidad comprada del stock del producto
            product.stock -= cartItem.quantity;
            await product.save();
            productsToPurchase.push(cartItem);
        }

            if (productsToPurchase.length === 0) {
                console.log("No hay productos para comprar");
                //Actualizo el carrito del usuario con los productos que no compró.
                return res.json({ message: "No hay productos para comprar" });
            }
            
            //Hago la suma de los productos.
            const amount = productsToPurchase.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
            console.log("AMOUNT"  + amount);

            //Genero el ticket
            await ticketManager.creatTicket(amount, purchaser)
            console.log("PRODUCTS TO REMOVE    " + productsToKeep);
            console.log("PRODUCTS TO PURCHASE  " + productsToPurchase);

            //Actualizo el carrito del usuario con los productos que no compró.
            await manager.updateCart(cartId,productsToKeep);

        res.json({ message: "Compra realizada exitosamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al procesar la compra" });
    }
}

export {crtl_DEL_CartId, crtl_GET_CartId, crtl_DEL_ProdOnCart, crtl_POST_ProdOnCart, crtl_PUT_ProdOnCart, crtl_GET_Cart, crtl_POST_Cart, crtl_PUT_CartId, crtl_POST_purchase}

