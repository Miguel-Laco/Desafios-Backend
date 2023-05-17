import express from "express";
import productRouter from "./routes/products.js";
import cartRouter from "./routes/carts.js";

const app = express(); //Inicializo el modulo express y estará contenido en app
app.use(express.urlencoded({extended: true})); //Para que el server interprete urlencoded
app.use(express.json()); //Para que interprete mensajes tipo JSON
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);



//Genero un saludo para el raíz
app.get(`/`, (req, res) => {
    res.send(`Bienvenido a la lista de Productos en EXPRESS`)
})

const server = app.listen(8080, () => console.log("Servidor escuchando 8080"));