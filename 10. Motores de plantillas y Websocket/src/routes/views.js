import { Router } from "express";
import ProductManager from "../ProductManager.js";

const manager = new ProductManager() //Inicializo la clase

const views = Router();


//Genero una vista para mostrar todos los productos en home.handlebars
views.get(`/`, (req, res) => {


    res.render("datos", {})
})


//Genereo una vista para trabajar con websockets
views.get(`/realtimeproducts`, (req, res) => {

    res.render("realTimeProducts", {})
})

export default views;