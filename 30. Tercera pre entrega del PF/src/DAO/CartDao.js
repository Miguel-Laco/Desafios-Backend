import { cartsModel } from "./model/carts.model.js";
import ProductDao from "./ProductDao.js"

const manager = new ProductDao();

class CartDao{

constructor(){
    this.model = cartsModel;
}

async getCarts(){
    try {
        //Traigo la lista de carritos y la devuelvo
        let carts = await cartsModel.find();
        return carts;
    } catch (error) {
        console.log(error);
    }
}

async getCartsById(id){
    try {
        let cart = await cartsModel.find({_id: id})
        if (!cart) {
            throw new Error (`${cart} NO EXISTE`)
        }
            return cart
        } catch (error) {
        throw new Error(error.message)
    }
}

//Creo un carrito
async addCarts(){
    try {
        let cart = await cartsModel.create({
            products:{
                type: Array,
                default: []
            }
        })
        return cart
    } catch (error) {
        console.log(error);
    }
    return{status:"Existoso", msg:`Se agregó el carrito con ID: ${cart.id}`};
}

// Agrego un producto al carrito
async addProductToCart(cid, pid){
    try {
        let cartID = await cartsModel.findOne({_id: cid})
        if (!cartID) {
            // Valido si el carrito existe
            throw new Error("El carrito no existe");
        }
        let productAdd = await manager.getProductsById(pid);
        if (!productAdd) {
            // Valido si el producto existe
            throw new Error("El producto no existe");
        }
        // Busco si el producto ya existe en el carrito
        const productExist = cartID.cart.find((item) => item.product.equals(productAdd._id));
        
        if (productExist) {
            // Si el producto ya existe, incremento la cantidad
            await cartsModel.updateOne(
                { _id: cid, "cart.product": productAdd._id },
                { $inc: { "cart.$.quantity": 1 } }
            );
            return { status: "Éxito", message: "Producto agregado al carrito exitosamente" };
        } else {
            // Si el producto no existe, lo agrego al carrito
            cartID.cart.push({
            product: productAdd._id,
            quantity: 1,
        });
        await cartID.save();
        return { status: "Éxito", message: "Producto agregado al carrito exitosamente" };
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

// Eliminar un producto del carrito
async removeProductFromCart(cid, pid) {
    try {
        const cart = await cartsModel.findOne({ _id: cid });
        if (!cart) {
            throw new Error("El carrito no existe");
        }
        const productIndex = cart.cart.findIndex((item) =>
            item.product.equals(pid)
        );
        if (productIndex === -1) {
            throw new Error("El producto no existe en el carrito");
        }
        cart.cart.splice(productIndex, 1); // Elimino el producto del arreglo cart
        await cartsModel.updateOne({ _id: cid }, { cart: cart.cart }); // Actualiza el carrito en la base de datos
        return { status: "Éxito", message: "Producto eliminado del carrito exitosamente" };
    } catch (error) {
        throw new Error(error.message)
    }
}

/* //Actualizo todo el carrito, con el arreglo que recibo (piso todo)
async updateCart(cid, products) {
    try {
        console.log("ESTO RECIBE updateCart   " + products);
    const cart = await cartsModel.findOne({ _id: cid });
    if (!cart) {
        throw new Error("El carrito no existe");
    }
    
      // Creo un nuevo arreglo de objetos cart con los productos y cantidades
    const updatedCart = products.map((item) => {
        if (item._id && item.quantity) {
              // Si el objeto tiene tanto _id como quantity, se asume que está completo. (ver luego otra validación)
        return {
            product: item._id,
            quantity: item.quantity,
        };
        } else {
            throw new Error("Se proporcionó un objeto inválido en el arreglo de productos");
        }
    });
    
      // Actualizo el carrito con el nuevo arreglo de productos y cantidades
    cart.cart = updatedCart;
    await cart.save();
    } catch (error) {
    console.log(error);
    }
} */


async updateCart(cid, productsToKeep) {
    try {
        const cart = await cartsModel.findOne({ _id: cid });
        if (!cart) {
            throw new Error("El carrito no existe");
        }

        // Filtrar los productos que se deben mantener en el carrito
        const updatedCart = cart.cart.filter((item) => {
            const cartToKeep = productsToKeep.find((keepItem) =>
                keepItem.product.equals(item.product)
            );
            return !!cartToKeep;
        });

        cart.cart = updatedCart;
        await cart.save();
    } catch (error) {
        console.log(error);
    }
}






  // Actualizar la cantidad  de un producto en el carrito
async updateProductQuantity(cid, pid, quantity) {
    try {
        console.log("ID" + cid);
        console.log("PID" + pid);
        console.log("cant" + quantity);
    const cart = await cartsModel.findOne({ _id: cid });
    if (!cart) {
        throw new Error("El carrito no existe");
    }
    const product = cart.cart.find((item) => item.product.equals(pid));
    if (!product) {
        throw new Error("El producto no existe en el carrito");
    }
      product.quantity = quantity; // Actualiza la cantidad del producto
    await cartsModel.updateOne(
        { _id: cid, "cart.product": pid },
        { $set: { "cart.$.quantity": quantity } } // Actualiza la cantidad del producto en la base de datos
    );
    } catch (error) {
    console.log(error);
    }
}

// Vacío todo el carrito
async deleteCart(cid) {
    try {
    const cart = await cartsModel.findOne({ _id: cid });
    if (!cart) {
        throw new Error("El carrito no existe");
    }
    cart.cart = [];
    await cart.save();
    console.log("Productos eliminados del carrito exitosamente");
    } catch (error) {
    console.log(error);
    }
}



}



export default CartDao;