/* products.js*/

const socket = io(); // Conectarse al servidor a través de sockets


const addToCart = async (pid) =>{
  const cid =  prompt('Ingrese el ID del carrito:'); // Solicita el ID del carrito al usuario
    // Envío por socket el id del producto y del cart elegido por el usuario
socket.emit("productToAdd", { pid, cid })
}

//Esucho si devuelve una confirmación
socket.on("productAdd-confirm", addPorduct => {
  Swal.fire({
    title: "Producto agregado",
    text: addPorduct.message,
    icon: "success",
  });
});

//Escucho si devuelve un error
socket.on("productAdd-error", error => {
  Swal.fire({
    title: "Error al agregar producto",
    text: error.message,
    icon: "error",
  });
});

