const { log } = require("console");
const fs = require(`fs`);

class ProductManager{

    constructor(){
        this.path = "./arregloProductos.txt";
        this.productTemp = [];
        this.temp = [];
        this.otroTemp = [];
        }

    async idGenerator(){
        let productos = await this.readProducts();
        let nextId = this.productTemp;
        let resultado = nextId.length + productos.length + 1;
        return resultado
    }

async readProducts () {
    let productos = await fs.promises.readFile(this.path, "utf-8"); //Busco la lista de productos
        return JSON.parse(productos); //Los convierto a objeto
}

    async getProducts () {
        try {
            let productos = await this.readProducts()//Busco la lista de productos
            return console.log(productos);
        } catch (error) {
            console.log(error);
            }  
    }

    async getProductsById(id){
        let productos = await this.readProducts();
        let existe = productos.find(prod => prod.id == id);
        if (existe) {
            return console.log(existe);
        } else {
            return 'Not Found';
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
            this.productTemp.push(nuevoProducto);
            //valido que el código no exista en el .TXT
            const existe = productos.find(prod => prod.code == nuevoProducto.code);
            const existeEnTemporal = this.otroTemp.find(prod => prod.code == nuevoProducto.code);
                if (existe || existeEnTemporal) {
            console.log(`Su codigo de producto ${nuevoProducto.code} ya existe en la base y no será agregado`);
                } else{
                //si esta todo ok, 
                    this.otroTemp.push(nuevoProducto);
                    productos.push(...this.otroTemp);
                    await fs.promises.writeFile(this.path, JSON.stringify(productos))

                }
            }
    }

    async updateProduct (id, campos) {
        let productos = await this.readProducts();
        let indice = productos.findIndex(prod => prod.id === id);
        if (indice !== -1) {
            productos[indice] = {
                ...productos[indice],
                ...campos
            }
        }
        await fs.promises.writeFile(this.path, JSON.stringify(productos))
    }

    
    async deleteProduct (id){
        let productos = await this.readProducts();
        let index = productos.findIndex(prod => prod.id === id);
    if (index !== -1){
           //Hago un "splice", que se para en la posicion seleccionada y borra 1 en este caso
        productos.splice(index, 1) 
        await fs.promises.writeFile(this.path, JSON.stringify(productos))
        } else{
        console.log(`El producto con su id ${id}, no existe`);
        }
    }
}

let producto = new ProductManager();

// // // AGREGAR PRODUCTOS  ****************************************************************
// producto.addProducts('sierra', 'cortar', 5000, './img/sierra.jpg', 'SIE1', 3);
// producto.addProducts('pala', 'excavar', 8000, './img/pala.jpg', 'PAL2', 8);
// producto.addProducts('hacha', 'talar', 3000, './img/hacha.jpg', 'HAC3', 8);
// producto.addProducts('martillo', 'clavar', 4000, './img/martillo.jpg', 'MAR4', 7);


// // BUSCAR PRODUCTOS *******************************************************************
// producto.getProducts();


// // BUSCAR PRODUCTOS POR ID **************************************************************
// producto.getProductsById(1);


// //ACTUALIZAR UN PRODUCTO POR SU ID ********************************************************
// producto.updateProduct(1, {title:"tenedor", stock: 500});


// // ELIMINAR UN PRODUCTO POR SU ID  *******************************************************
// producto.deleteProduct(1);