import { Router } from "express";
import ProductManager from "../DAO/ProductManager.js";
import ProductDao from "../DAO/ProductDao.js";

const productRouter = Router();
const productDao = new ProductDao(); //Inicializo la clase 

/* /////////////////////            GET           //////////////////////////// */

//Genero un query que devuelve la cantidad de productos indicado en limit o todos los productos si no se indica
productRouter.get(`/`, async (req, res) => {
    try {
        let {limit} = req.query;
        let products = await productDao.getProducts();
        let response = limit ? products.slice(0, limit) : products
        res.send(response)
    } catch (error) {
        res.status(404).send({status: "error", error})
    }
})


//Entrego el ID solicitado y si no existe muestro un error
productRouter.get(`/:pid`, async (req, res) => {
    try {
        let id = req.params.pid;
        let response = await productDao.getProductsById(id);
        if (response) {
            res.send(response)
        }else {
            res.status(400).send({status: "error", msg: `Error con el ${id}, no existe`})
        }
    } catch (error) {
        res.status(404).send({status: "error", error})
    }
})

/* ////////////////////////    POST    ////////////////////////////////// */


productRouter.post(`/`, async (req, res) => {
try {
    let product = req.body;
    if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category){
        res.status(400).send({status: "error", error: "Invalid Parameters"})
    }else{
        res.send(await productDao.addProduct(product.title, product.description, product.code, product.price, product.stock, product.category, product.thumbnail));
    }
} catch (error) {
    console.log(error);
}
})


/* ////////////////////////    PUT    ////////////////////////////////// */

productRouter.put(`/:id`, async (req, res) => {
    try {
        let id = req.params.id;
        let campos = req.body;
        res.send(await productDao.updateProduct(id, campos))
    } catch (error) {
        console.log(error);
    }
})


/* ////////////////////////    DELETE    ////////////////////////////////// */


productRouter.delete(`/:pid`, async (req, res) => {
    try {
        let id = req.params.pid;
        res.send(await productDao.deleteProduct(id))
    } catch (error) {
        console.log(error);
    }
})

export default productRouter;