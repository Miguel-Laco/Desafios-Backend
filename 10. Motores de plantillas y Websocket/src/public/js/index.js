const socket =io();

socket.emit("prueba", "Hola soy una prueba desde websocket")

// io hace referencia a "socket.io, se llama así por convención"
// La linea 1 permite instanciar el socket y guardarlo en la constante "socket"
// Dicho socket es el que utilizaremos para comunicarnos con el socket del servidor
// Este lado es el "CLIENTE"