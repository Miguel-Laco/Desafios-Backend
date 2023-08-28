/* config.js */
import dotenv from "dotenv";

dotenv.config();


export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    GITHUB_API_KEY: process.env.GITHUB_API_KEY,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
    GITHUB_SCOPE: process.env.GITHUB_SCOPE,
    SESSION_SECRET: process.env.SESSION_SECRET,
    ADMIN_MAIL: process.env.ADMIN_MAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    COLLECTION_CARTS: process.env.COLLECTION_CARTS,
    COLLECTION_MESSAGES: process.env.COLLECTION_MESSAGES,
    COLLECTION_PRODUCTS: process.env.COLLECTION_PRODUCTS,
    COLLECTION_USERS: process.env.COLLECTION_USERS,
    COLLECTION_TICKETS: process.env.COLLECTION_TICKETS,
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    ENVIROMENT: process.env.ENVIROMENT
}