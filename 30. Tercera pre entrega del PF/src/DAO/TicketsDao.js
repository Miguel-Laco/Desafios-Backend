/* TicketsDao.js */
import {ticketsModel} from "./model/ticket.model.js"
import crypto from "node:crypto"

class TicketDao{

    constructor(){
        this.model = ticketsModel;
    }

    async getTickets () {
        try {
            let tickets = await ticketsModel.find()
            return tickets
        } catch (error) {
            console.log(error);
        }
    }

    async getTicketsById(id){
        try {
            let ticket = await ticketsModel.findOne({_id: id}) //Busco el ID
            return ticket
        } catch (error) {
            console.log(`Error con el ${id}, no existe`);
            }  
    }

    async deleteTicket (id){
        try {
            console.log(id);
            await ticketsModel.deleteOne({_id: id}); //Busco la lista
            return {status:"Success", msg:`Su ticket ID: ${id}, fue eliminado`}
        } catch (error) {
            return{status:"Error", msg:`Su ticket ID: ${id}, no existe`};
        }
    }
// ESTOY TRABAJANDO ACA
    async creatTicket(amount, purchaser){
        let ticket;
        try {
            ticket = await ticketsModel.create({
                code: crypto.randomUUID(),
                purchase_datetime: new Date(),
                amount,
                purchaser: purchaser
            })
            return {status:"Success", msg:`Su ticket ${code}, fue creado`}
        } catch (error) {
            return{status:"Error", msg:`Hubo un problema con la creación del ticket`,error };
        }
    
    }

}

export default TicketDao;