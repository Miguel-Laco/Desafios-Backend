import express from "express";
import productRouter from "./routes/products.js";
import cartRouter from "./routes/carts.js";
import handlebars from "express-handlebars";
import views from "./routes/views.js"
import { Server } from "socket.io";
import ProductManager from "./ProductManager.js";



const app = express(); //Inicializo el modulo express y estará contenido en app
const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor escuchando puerto ${PORT}`));
const socketServer = new Server(server); //SocketServer será un servidor para trabajar con sockets

app.use(express.urlencoded({extended: true})); //Para que el server interprete urlencoded
app.use(express.json()); //Para que interprete mensajes tipo JSON
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", views);
app.engine("handlebars", handlebars.engine()); //Inicializo el motor de plantillas
app.set("views", "./views"); //Indico donde estarán las vistas
app.set("view engine", "handlebars"); //Indicamos que para renderizar, utilice handlebars
app.use(express.static(`public`));

const manager = new ProductManager() //Inicializo la clase


//Comienzo a escuchar la conección de un socket
socketServer.on(`connection`, async (socket) => {
    //Muestro por log que se conectó un nuevo cliente
    console.log("Nuevo Cliente Conectado");
    //Enviío la lista de productos al socket conectado
        let products = await manager.readProducts();
        socket.emit("listaProductos",  {
            products
        })


    //Comienzo a escuchar el socket, para crear un producto
    socket.on("crearProducto", async (data) => {
        console.log(data);
        //Luego lo envío a la función addProducts, la data recibida del socket
        await manager.addProducts( data.title, data.description, data.code, data.price, data.stock, data.category, data.thumbnail)
    })
    

    //Comienzo a esuchar el socket, para eliminar un producto
    socket.on("productDelete", async (id) => {
        //Luego lo envío a la función deleteProducts
        await manager.deleteProduct(id)
    })

})






