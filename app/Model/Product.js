/**
 * Product:
 */
export default class Product {
    constructor({ id, photo, title, price, amount = 1 }) {
        this._id = id;
        this._photo = photo;
        this._title = title;
        this._price = price;
        this._amount = amount;
    }

    total() {
        return parseFloat(this._price) * parseFloat(this._amount);
    }
}
