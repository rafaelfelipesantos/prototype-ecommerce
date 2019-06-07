/**
 * ProductService:
 */
export default class ProductService {
    constructor() {
        this._resource = './data/products.json';
    }

    async getAll() {
        try {
            let products = await fetch(this._resource);
            let data = await products.json();
            return data;
        } catch (e) {
            console.warn(e.toString());
        }
    }

    async getById(id) {
        try {
            let data = await this.getAll();
            return data.filter(item => id === item.id)[0];
        } catch (e) {
            console.warn(e.toString());
        }
    }
}
