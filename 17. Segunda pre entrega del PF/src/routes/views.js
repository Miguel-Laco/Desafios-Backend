import { Router } from "express";
import ProductManager from "../DAO/ProductManager.js";
import ProductDao from "../DAO/ProductDao.js";
import CartDao from "../DAO/CartDao.js"
import { productsModel } from "../DAO/model/products.model.js";

const productDao = new ProductDao();
const cartDao = new CartDao();
const manager = new ProductManager(); //Inicializo la clase

const views = Router();


//Genero una vista para mostrar todos los productos en el raiz
views.get(`/`, async (req, res) => {
    //Envío la lista de productos a la vista raíz
    let products = await productDao.getProducts();
    //Renderízo la vista home y adjunto su hoja de estilos
    res.render("home", {products: JSON.parse(JSON.stringify(products)), style:"home.css"})
})


//Genereo una vista para trabajar con websockets en /realtimproducts
views.get(`/realtimeproducts`, async (req, res) => {
    //Renderízo la vista realTimeProducts y adjunto su hoja de estilos
    res.render("realTimeProducts", {style:"realtimeproducts.css"})

})


//Genereo una vista para trabajar con websockets en /realtimproducts
views.get(`/chat`, async (req, res) => {
    //Renderízo la vista chat y adjunto su hoja de estilos
    res.render("chat", {style:"chat.css"})

})

//Genero una vista /products
views.get(`/products`, async (req, res) => {
    try {
    const { page = 1, limit = 10, sort, query } = req.query;

      // Configuro opciones de paginación y filtrado
    const options = {
        page: parseInt(page), // Página actual
        limit: parseInt(limit), // Límite de elementos por página
        sort: sort === 'asc' ? 'price' : sort === 'desc' ? '-price' : null, // Ordenamiento ascendente o descendente por precio
        lean: true, // Obtener resultados como objetos JSON simples
    }; 

    // Crear objeto de búsqueda con filtros
    const filters = {};
    if (query) {
    filters.$or = [
        { category: { $in: [query] } },
        { title: { $in: [query] } },
        { description: { $in: [query] } },
    ];
    }

      // Obtengo los productos paginados y filtrados aplicando las opciones
    const result = await productsModel.paginate(filters, options);

      // Creo un variable de datos para pasar a la vista con lo que pide la consigna
    const data = {
        status: 'success',
        payload: result.docs, // Productos obtenidos
        style: 'products.css', // Aplico estilos a la vista
        totalPages: result.totalPages, // Número total de páginas
        prevPage: result.hasPrevPage ? result.prevPage : null, // Página anterior (null si no existe)
        nextPage: result.hasNextPage ? result.nextPage : null, // Página siguiente (null si no existe)
        page: result.page, // Página actual
        hasPrevPage: result.hasPrevPage, // Indicador para saber si la página previa existe
        hasNextPage: result.hasNextPage, // Indicador para saber si la página siguiente existe
        prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}&limit=${limit}` : null, // Enlace a la página anterior (null si no existe)
        nextLink: result.hasNextPage ? `/products?page=${result.nextPage}&limit=${limit}` : null // Enlace a la página siguiente (null si no existe)
    };
      // Renderizo la vista 'products' y paso datos con toda la info
    res.render('products', data);
    } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).send('Error retrieving products');
    }
});


//Genero una vista para visualizar solo el carrito específico, según entiendo pide la consigna
views.get(`/carts/:cid`, async(req, res) => {
    //Renderízo la vista carts y adjunto su hoja de estilos
    try {
        let id = req.params.cid;
        const cart = await cartDao.getCartsById(id);
        res.render("cart", { cart: JSON.parse(JSON.stringify(cart[0]))});
    } catch (error) {
        console.log(error);
    }
})


export default views;