import {messagesModel} from "./model/messages.model.js"

class MessagesDao{

    constructor(){
        this.model = messagesModel;
    }

    async getMessages () {
        try {
            let messages = await messagesModel.find();
            return messages
        } catch (error) {
            console.log(error);
        }
    }

    async addMessages (user, message) {
        let messages;
        try {
            messages = await messagesModel.create({
                user,
                message
            })
        } catch (error) {
            console.log(error);
        }
        return messages
    }


}

export default MessagesDao;
