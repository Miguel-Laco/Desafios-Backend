import express from "express";
import productRouter from "./routes/products.js";
import cartRouter from "./routes/carts.js";
import handlebars from "express-handlebars";
import views from "./routes/views.js"
import { Server } from "socket.io";


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


socketServer.on(`connection`, socket => {
    console.log("Nuevo Cliente Conectado");
    socket.on("prueba", data =>{console.log(data)})

    /* Acá debería crear socket.on, para escuchar un nuevo evento, que traiga el nuevo producto */
    /* socket.on("nombre de evento", data =>{console.log(data)}) */
})






