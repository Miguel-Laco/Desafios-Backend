import mongoose from "mongoose";

const messagesCollection = "messages";

const MessagesSchema = new mongoose.Schema({
    user: String,
    message : {
        type: String,
        default: ""
    }
})

export const  messagesModel = mongoose.model(messagesCollection, MessagesSchema)