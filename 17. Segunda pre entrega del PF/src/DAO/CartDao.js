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
            return cart
        } catch (error) {
        console.log(error);
    }
}

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
    return{status:"Existoso", msg:`Se agregó el carrito con ID: ${carrito.id}`};
}

async addProductToCart(cid, pid){
    try {
        let cartID = await cartsModel.findOne({_id: cid})
        let productAdd = await manager.getProductsById(pid);
        // console.log(cartID);
        // console.log(productAdd);
        cartID.cart.push({product: productAdd._id});
        let result = await cartsModel.updateOne({_id: cartID._id}, cartID)
        console.log(result);
    } catch (error) {
        
    }
}



}

export default CartDao;