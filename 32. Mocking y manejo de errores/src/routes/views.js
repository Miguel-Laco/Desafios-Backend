/* route views.js */
import { Router } from "express";
import CartDao from "../DAO/CartDao.js"
import passport from "passport";
import {authLogin} from "../middlewares/auth.js"
import { authUser } from "../middlewares/auth.js";
import {
    ctrl_Home, 
    ctrl_Cart, 
    ctrl_Chat, 
    ctrl_Products, 
    ctrl_RealtimeProducts,
    ctrl_MockingProducts
} from "../controllers/views_controllers.js"



const cartDao = new CartDao();

const views = Router();



//Genero una vista para mostrar todos los productos en el raiz
views.get(`/`, ctrl_Home)


//Genereo una vista para trabajar con websockets en /realtimproducts
views.get(`/realtimeproducts`, ctrl_RealtimeProducts)


//Genereo una vista para trabajar con websockets en /realtimproducts
views.get(`/chat`, authUser, ctrl_Chat)

//Genero una vista /products
views.get(`/products`, authLogin, ctrl_Products);


//Genero una vista para visualizar solo el carrito específico, según entiendo pide la consigna
views.get(`/carts/:cid`, authLogin, ctrl_Cart)

//Genero una vista para la clase 32, que genere 100 productos con Mocking
views.get(`/mockingproducts`, ctrl_MockingProducts);


export default views;