import { Router } from "express";
import ProductManager from "../ProductManager.js";

const manager = new ProductManager() //Inicializo la clase

const views = Router();


//Genero una vista para mostrar todos los productos en el raiz
views.get(`/`, async (req, res) => {
    //Envío la lista de productos a la vista raíz
    let products = await manager.readProducts();
    //Renderízo la vista home y adjunto su hoja de estilos
    res.render("home", {products, style:"home.css"})
})


//Genereo una vista para trabajar con websockets en /realtimproducts
views.get(`/realtimeproducts`, async (req, res) => {
    //Renderízo la vista realTimeProducts y adjunto su hoja de estilos
    res.render("realTimeProducts", {style:"realtimeproducts.css"})

})

export default views;