/* ProductDao.js */
import { productsModel } from "./model/products.model.js";
import { logger } from "../utils/logger.js";

class ProductDao{
    
    constructor(){
        this.model = productsModel;
    }

    async getProducts () {
        try {
            let productos = await productsModel.find() //Busco la lista
            return productos
        } catch (error) {
            logger.error(error);
            }  
    }

    async getProductsById(id){
        try {
            let productos = await productsModel.findOne({_id: id}) //Busco el ID
            return productos
        } catch (error) {
            logger.error(`Error con el ${id}, no existe`);
            }  
    }

    async deleteProduct (id){
        try {
            logger.info(`El id del producto a eliminar es ${id}`);
            await productsModel.deleteOne({_id: id}); //Busco la lista
            return {status:"Success", msg:`Su product ID: ${id}, fue eliminado`}
        } catch (error) {
            return{status:"Error", msg:`Su product ID: ${id}, no existe`};
        }
    }

    async updateProduct (id, campos) {
        let product;
        try {
            product = await productsModel.updateOne({_id: id}, campos);
        } catch (error) {
            logger.error(error);
        }
        return product;
    }

    async addProduct(title, description, code, price, stock, category, thumbnail){
        let product;
        try {
            product = await productsModel.create({
                title,
                description,
                code,
                price,
                status: true,
                stock,
                category,
                thumbnail: Array.isArray(thumbnail) ? thumbnail : [thumbnail] 
            })
        } catch (error) {
            logger.error(error);
        }
        return product;
    }

}

export default ProductDao;

