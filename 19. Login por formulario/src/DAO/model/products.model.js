import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const productsCollection = "products";

const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: Boolean,
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: Array
}, { strict: false })

//Configuro la paginación para mi cartsmodel
ProductsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, ProductsSchema);