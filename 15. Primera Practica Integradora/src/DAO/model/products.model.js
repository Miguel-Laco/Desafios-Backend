import mongoose from "mongoose";

const productsCollection = "products";

const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    status: Boolean,
    stock: {
        type: Number,
        require: true
    },
    cetegory: {
        type: String,
        require: true
    },
    thumbnail: Array
})

export const productsModel = mongoose.model(productsCollection, ProductsSchema);