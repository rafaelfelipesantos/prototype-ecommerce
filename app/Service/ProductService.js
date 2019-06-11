import HttpService from './HttpService.js';
import GhostDB from '../Helper/GhostDB.js';
import Product from '../Model/Product.js';

/**
 * ProductService:
 */
export default class ProductService {
    constructor() {
        this._http = new HttpService('./data/products.json');
        this._db = new GhostDB('ecommerce', 1);
    }

    async importProductsFromDB() {
        try {
            const data = await this._db.findAll('products');
            return data.map(product => new Product(
                product._id, 
                product._photo, 
                product._title, 
                product._price, 
                product._amount
            ));
        } catch (e) {
            console.warn(e.toString());
        }
    }

    async findAll() {
        try {
            return await this._http.findAll();
        } catch (e) {
            console.warn(e.toString());
        }
    }

    async findById(id) {
        try {
            const data = await this._http.findById(id);
            return new Product(
                data.id, 
                data.photo, 
                data.title, 
                data.price, 
                data.amount
            );
        } catch (e) {
            console.warn(e.toString());
        }
    }

    async insert(product) {
        try {
            return await this._db.insert('products', product);
        } catch (e) {
            console.warn(e.toString());
        }
    }

    async update(object) {
        try {
            return await this._db.update('products', object);
        } catch (e) {
            console.warn(e.toString());
        }
    }

    async delete(id) {
        try {
            return await this._db.delete('products', id);
        } catch (e) {
            console.warn(e.toString());
        }
    }
}
