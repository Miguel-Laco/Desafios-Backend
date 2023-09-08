//Genero un DTO para evitar enviar la información sensible en current
export default class UserDTO{
    constructor(user){
        this.first_name = user.first_name,
        this.last_name = user.last_name,
        this.email = user.email
    }
}