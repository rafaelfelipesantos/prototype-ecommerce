import Product from './Product.js';
import CouponOfDiscount from './CouponOfDiscount.js';

/**
 * Cart:
 */
export default class Cart {
    constructor() {
        this._items = [];
        this._total = 0;
        this._discount = 0;
    }

    get items() {
        return this._items.slice();
    }

    get total() {
        this._total = this._items.reduce((accumulated, actual) => accumulated + actual.total(), 0);
        if (this._discount)
            return this._total - this._discount;
        return this._total;
    }

    add(product) {
        if (!(product instanceof Product))
            throw new TypeError('The product should be instance of Product!');
        this._items.push(product);
    }

    remove(id) {
        this._byProductId(id, (product, index) => this._items.splice(index, 1));
    }

    changeAmount(id, amount) {
       this._byProductId(id, product => product._amount = amount);
    }

    applyCouponOfDiscount(code) {
        this._discount = (new CouponOfDiscount(this)).apply(code);
        console.log(this._discount);
    }

    _byProductId(id, callback) {
        if (!this._hasProduct(id))
            throw new Error('Product id not found!');

        this._items.forEach((product, index) => {
            if (id === product._id)
                callback(product, index);
        });
    }

    _hasProduct(id) {
        return this._items.some(product => id === product._id);
    }
}
