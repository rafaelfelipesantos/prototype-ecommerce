import HttpService from './HttpService.js';
import GhostDB from '../Helper/GhostDB.js';

/**
 * ProductService:
 */
export default class ProductService {
    constructor() {
        this._http = new HttpService('./data/products.json');
        this._db = new GhostDB('ecommerce', 1);
    }

    async findAll() {
        try {
            const dataDB = await this._db.findAll('products');
            if (!dataDB.length)
                return await this._http.findAll();
            return dataDB;
        } catch (e) {
            console.warn(e.toString());
        }
    }

    async findById(id) {
        try {
            const dataDB = await this._db.findById('products', id);
            if (!dataDB.length)
                return await this._http.findById(id);
            return dataDB;
        } catch (e) {
            console.warn(e.toString());
        }
    }
}
