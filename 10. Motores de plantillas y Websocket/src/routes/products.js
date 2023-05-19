import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productRouter = Router();
const manager = new ProductManager() //Inicializo la clase

/* /////////////////////            GET           //////////////////////////// */

//Genero un query que devuelve la cantidad de productos indicado en limit o todos los productos si no se indica
productRouter.get(`/`, async (req, res) => {
    try {
        let {limit} = req.query;
        let products = await manager.readProducts();
        let response = limit ? products.slice(0, limit) : products
        res.send(response)
    } catch (error) {
        console.log(error);
    }
})


//Entrego el ID solicitado y si no existe muestro un error
productRouter.get(`/:pid`, async (req, res) => {
    try {
        let id = req.params.pid;
        let response = await manager.getProductsById(id);
        if (response) {
            res.send(response)
        }else {
            res.status(400).send({status: "error", msg: `Error con el ${id}, no existe`})
        }
    } catch (error) {
        console.log(error);
    }
})

/* ////////////////////////    POST    ////////////////////////////////// */


productRouter.post(`/`, async (req, res) => {
try {
    let product = req.body;
    if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category){
        res.status(400).send({status: "error", error: "Invalid Parameters"})
    }else{
        res.send(await manager.addProducts(product.title, product.description, product.code, product.price, product.status, product.stock, product.category, product.thumbnail));
    }
} catch (error) {
    console.log(error);
}
})


/* ////////////////////////    PUT    ////////////////////////////////// */

productRouter.put(`/`, async (req, res) => {
    try {
        let id = req.body.id;
        let campos = req.body;
        res.send(await manager.updateProduct(id, campos))
    } catch (error) {
        console.log(error);
    }
})


/* ////////////////////////    DELETE    ////////////////////////////////// */


productRouter.delete(`/:pid`, async (req, res) => {
    try {
        let id = req.params.pid;
        res.send(await manager.deleteProduct(id))
    } catch (error) {
        console.log(error);
    }
})

export default productRouter;