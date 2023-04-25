class ProductManager{

    constructor(){
    this.products = [];
    }

    idGenerator(){
        return this.products.length + 1;
    }

    getProducts(){
        return this.products;
    }

    getProductsById(id){
        const existe = this.products.find(prod => prod.id == id);
        if (existe) {
            console.log(existe);
        } else {
            console.log('Not Found');
        }
    }

    addProducts(title, description, price, thumbnail, code, stock){
        let nuevoProducto = {
            id: this.idGenerator(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        const existe = this.products.find(prod => prod.code == nuevoProducto.code);
        if (existe) {
            console.log("Su codigo de producto ya existe en la base y no será agregado");
        }else if (!nuevoProducto.title || !nuevoProducto.description || !nuevoProducto.price || !nuevoProducto.thumbnail || !nuevoProducto.code || !nuevoProducto.stock){
            console.log("Su producto no fue creado, porque olvidó completar uno de sus campos");
        }else {
            this.products.push(nuevoProducto);
        }
    }
}

let producto = new ProductManager();

// PROTOCOLO DE PRUEBAS
producto.addProducts('taladro', 'atornillador', 2000, './img/taladro.jpg', 'TAL1', 5);
producto.addProducts('sierra', 'cortar', 5000, './img/sierra.jpg', 'SIE2', 3);
// console.log(producto.getProducts());
// producto.getProductsById(1);
