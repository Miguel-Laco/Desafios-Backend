/* users.model */
import mongoose from "mongoose";

const usersCollection = "users";

const UserShcema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {type: String, unique: true},
    password: String,
    age: Number
});

export const usersModel = mongoose.model(usersCollection, UserShcema)