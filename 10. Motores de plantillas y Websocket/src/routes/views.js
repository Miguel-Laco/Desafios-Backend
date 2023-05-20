import { Router } from "express";
import ProductManager from "../ProductManager.js";

const manager = new ProductManager() //Inicializo la clase

const views = Router();


//Genero una vista para mostrar todos los productos en home.handlebars
views.get(`/`, async (req, res) => {
    let products = await manager.readProducts();
    res.render("home", {products, style:"home.css"})
})


//Genereo una vista para trabajar con websockets
views.get(`/realtimeproducts`, async (req, res) => {
    let products = await manager.readProducts();
    res.render("realTimeProducts", {products, style:"realtimeproducts.css"})
})

export default views;