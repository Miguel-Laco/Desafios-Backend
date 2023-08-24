/* products.controllers */
import ProductDao from "../DAO/ProductDao.js";
import CustomError from "../services/errors/CustomErrors.js";
import EErrors from "../services/errors/enums.js";
import {generateProductErrorInfo} from "../services/errors/info.js";

const productDao = new ProductDao(); //Inicializo la clase 

const crtl_GET_Products = async (req, res) => {
    try {
        let {limit} = req.query;
        let products = await productDao.getProducts();
        let response = limit ? products.slice(0, limit) : products
        res.send(response);
    } catch (error) {
        res.status(404).send({status: "error", error});
    }
};

const crtl_GET_ProductId = async (req, res) => {
    try {
        let id = req.params.pid;
        let response = await productDao.getProductsById(id);
        if (response) {
            res.send(response);
        }else {
            res.status(400).send({status: "error", msg: `Error con el ${id}, no existe`});
        }
    } catch (error) {
        res.status(404).send({status: "error", error});
    }
};

const crtl_POST_Products = async (req, res) => {
    try {
        let product = req.body;
        if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category){
            CustomError.createError({
                name: "Error al crear el producto",
                cause: generateProductErrorInfo(product),
                message: "Error al intentar crear el producto",
                code: EErrors.INVALID_PARAM
            });
        }

        res.send(await productDao.addProduct(product.title, product.description, product.code, product.price, product.stock, product.category, product.thumbnail));
    
    } catch (error) {
       res.status(400).json({ status: 'error', error: error.message });
    }
    };

const crtl_PUT_ProductId = async (req, res) => {
    try {
        let id = req.params.id;
        let campos = req.body;
        res.send(await productDao.updateProduct(id, campos));
    } catch (error) {
        console.log(error);
    }
};

const crtl_DEL_ProductId = async (req, res) => {
    try {
        let id = req.params.pid;
        res.send(await productDao.deleteProduct(id));
    } catch (error) {
        console.log(error);
    }
};

export {crtl_DEL_ProductId, crtl_GET_ProductId, crtl_GET_Products, crtl_POST_Products, crtl_PUT_ProductId}