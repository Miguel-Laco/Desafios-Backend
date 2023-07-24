/* users.model */
import mongoose from "mongoose";

const usersCollection = "users";

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {type: String, unique: true},
    password: String,
    age: Number,
    cart: {type:mongoose.Schema.Types.ObjectId, ref: "carts"},
    role: {type: String, default: "user"}
});


export const usersModel = mongoose.model(usersCollection, UserSchema)