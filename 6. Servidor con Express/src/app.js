import express from "express";
import ProductManager from "./ProductManager.js";


const app = express(); //Inicializo el modulo express y estará contenido en app

app.use(express.urlencoded({extended: true})); //Para que el server interprete urlencoded

const manager = new ProductManager() //Inicializo la clase

//Genero un saludo para el raíz
app.get(`/`, (req, res) => {
    res.send(`Bienvenido a la lista de Productos en EXPRESS`)
})


//Genero un query que devuelve la cantidad de productos indicado en limit o todos los productos si no se indica
app.get(`/products`, async (req, res) => {
    try {
        let {limit} = req.query;
        let products = await manager.readProducts();
        let response = limit ? products.slice(0, limit) : products
        res.send(response)
    } catch (error) {
        console.log(error);
    }
})


//Entrego el ID solicitado y si no existe muestro muestro un error
app.get(`/products/:id`, async (req, res) => {
    try {
        let id = req.params.id;
        let products = await manager.readProducts();
        let response = products.find(elem => elem.id == id);
        if (response) {
            res.send(response)
        }else {
            res.send(`<br><h1>EL <a style="color: blue;">ID:${id}</a> NO EXISTE</h1>`)
        }
    } catch (error) {
        console.log(error);
    }
})

const server = app.listen(8080, () => console.log("Servidor escuchando 8080"));