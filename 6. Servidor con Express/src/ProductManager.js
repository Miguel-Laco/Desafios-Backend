import fs from "fs"

class ProductManager{

    constructor(){
        this.path = "./arregloProductos.txt";
        //Agrego dos arreglos temporales, que utilizo para validaciones
        this.productTemp = [];
        this.otroTemp = [];
        }

    async idGenerator(){
        //Sumo la cantidad de objetos en el .TXT + la cantidad en el arreglo temporal, para poder manejar el ID si se agregan varias objetos juntos.
        let productos = await this.readProducts();
        let nextId = this.productTemp;
        let resultado = nextId.length + productos.length + 1;
        return resultado
    }

    async readProducts () {
        // Separo en un método la lectura del .TXT porque lo utilizo varias veces.
        try {
            let productos = await fs.promises.readFile(this.path, "utf-8"); //Busco la lista de productos
            return JSON.parse(productos); //Los convierto a objeto
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts () {
        try {
            let productos = await this.readProducts() //Busco la lista
            return productos //La devuevlo por consola
        } catch (error) {
            console.log(error);
            }  
    }

    async getProductsById(id){
        let productos = await this.readProducts(); //Busco la lista
        let existe = productos.find(prod => prod.id == id); //Valido si existe el ID
        if (existe) {
            return console.log(existe); // Si existe, lo devuelvo por consola
        } else {
            return 'Not Found'; // Si no existe, devuelvo "Not Found"
        }
    }

    async addProducts(title, description, price, thumbnail, code, stock){
        let productos = await this.readProducts();
        //Antes de avanzar, valido que el producto traiga todos los campos
        if (!title || !description || !price || !thumbnail || !code || !stock){
            return console.log("Su producto no fue creado, porque olvidó completar uno de sus campos");
        }else{
            let nuevoProducto = {
                id: await this.idGenerator(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            this.productTemp.push(nuevoProducto); //Los almaceno en un arreglo temporal
            //Valido que el código no exista en el .TXT ni se esté repitiendo en el temporal
            const existe = productos.find(prod => prod.code == nuevoProducto.code);
            const existeEnTemporal = this.otroTemp.find(prod => prod.code == nuevoProducto.code);
                if (existe || existeEnTemporal) {
            console.log(`Su codigo de producto ${nuevoProducto.code} ya existe en la base y no será agregado`);
                    // Si se repite en algún lugar, vacío el temporal, para no saltear un ID en idGenerator
                    this.productTemp = []
                } else{
                //si esta todo ok, lo subo a otro temporal, que uso para validar luego que no vuelvan a sumar el mismo código de articulo y ya voy escribiendo el TXT
                    this.otroTemp.push(nuevoProducto);
                    productos.push(...this.otroTemp);
                    await fs.promises.writeFile(this.path, JSON.stringify(productos))
                }
            }
    }

    async updateProduct (id, campos) {
        let productos = await this.readProducts(); //Busco la lista
        let indice = productos.findIndex(prod => prod.id === id); //Busco el Indice
        if (indice !== -1) { //Si existe el Indice, reemplazo los campos que quiera modificar del objeto
            productos[indice] = {
                ...productos[indice],
                ...campos
            }
            console.log(productos[indice]); // Devuelvo por consola el objeto modificado
        }
        await fs.promises.writeFile(this.path, JSON.stringify(productos)) // Escribo
    }

    
    async deleteProduct (id){
        let productos = await this.readProducts(); //Busco la lista
        let index = productos.findIndex(prod => prod.id === id); //Busco el Indice
    if (index !== -1){
           //Si existe, hago un "splice", que se para en la posicion seleccionada y borra 1 en este caso
        productos.splice(index, 1) 
        await fs.promises.writeFile(this.path, JSON.stringify(productos)) //Escribo
        } else{
        console.log(`El producto con su id ${id}, no existe`); //Si no existe el ID, aviso por consola
        }
    }
}



// // DESAFÍO ENTREGABLE - PROCESO DE TESTING - CLASE 4

// // Se creará una instancia de la clase “ProductManager”
// // ***************************************************
let producto = new ProductManager();


// // Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
// // ***********************************************************************************
// producto.getProducts();


// // Se llamará al método “addProduct”  
// // El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
// // ****************************************************************
// producto.addProducts('sierra', 'cortar', 1000, './img/sierra.jpg', 'SIE1', 1);
// producto.addProducts('pala', 'excavar', 2000, './img/pala.jpg', 'PAL2', 2);
// producto.addProducts('hacha', 'talar', 3000, './img/hacha.jpg', 'HAC3', 3);
// producto.addProducts('martillo', 'clavar', 4000, './img/martillo.jpg', 'MAR4', 4);
// producto.addProducts('taladro', 'agujerear', 5000, './img/taladro.jpg', 'TAL5', 5);
// producto.addProducts('pico', 'picar', 6000, './img/pico.jpg', 'PIC6', 6);
// producto.addProducts('brocha', 'pintar', 7000, './img/pincel.jpg', 'BRO7', 7);
// producto.addProducts('pinza', 'apretar', 8000, './img/pinza.jpg', 'PIN8', 8);
// producto.addProducts('metro', 'medir', 9000, './img/metro.jpg', 'MED9', 9);
// producto.addProducts('fratacho', 'fratachar', 10000, './img/fratacho.jpg', 'FRA10', 10);


// // Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
// // ***************************************************************************
// producto.getProducts();


// // Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
// // ****************************************************************************
// producto.getProductsById(1);


// // Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
// // **************************************************************************
// producto.updateProduct(1, {title:"tenedor", stock: 500});


// // Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
// // **********************************************************************
// producto.deleteProduct(4);


export default ProductManager;