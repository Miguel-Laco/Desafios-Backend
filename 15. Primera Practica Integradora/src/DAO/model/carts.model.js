import mongoose from "mongoose";

const cartsCollection = "carts";

const CartsSchema = new mongoose.Schema({
    carts : Array
})

export const cartsModel = mongoose.model(cartsCollection, CartsSchema);