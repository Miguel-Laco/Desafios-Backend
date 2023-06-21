const socket =io();

/* socket.on('cartUpdated', (cart) => {
  console.log(cart);
  io.emit("hola")
  // Aquí puedes realizar las actualizaciones necesarias en el front-end con la información del carrito
}); */

function deleteProduct(cid, pid) {
console.log(cid);
console.log(pid);

  socket.emit("deleteProductFromCart", {cid, pid});
}


//Esucho si devuelve una confirmación
socket.on("deleteProductFromCart-confirm", addPorduct => {
  Swal.fire({
    title: "Producto eliminado",
    text: addPorduct.message,
    icon: "success",
  });
  //Agrego momentaneamente un reload. Luego recibiré la lista de productos por socket, al igual que en realtimeproducts
  //Hoy entiendo que no lo pide la consigna esto que hago.
  window.location.reload();
});

//Escucho si devuelve un error
socket.on("deleteProductFromCart-error", error => {
  Swal.fire({
    title: "Error al eliminar producto",
    text: error.message,
    icon: "error",
  });
});

//  DEBERÍA PONER LA LOGICA PARA ELIMINAR PRODUCTO Y VACIAR CARRITO
// TAMBIEN DEBERÏA ACTUALIZAR EL CARRITO CADA VEZ QUE MODIFICO UN PRODUCTO
// PERO ENTIENDO QUE NO LO PIDE LA CONSIGNA HOY