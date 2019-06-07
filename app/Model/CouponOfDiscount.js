import Cart from './Cart.js';

export default class CouponOfDiscount {
    constructor(cart) {
        if (!(cart instanceof Cart))
            throw new TypeError('The cart should be instance of Cart!');
        this._cart = cart;
    }

    apply(code) {
        const coupons = {
            '5OFF': () => this._calculateDiscount(5), 
            '10OFF': () => this._calculateDiscount(10), 
            '15OFF': () => this._calculateDiscount(15)
        };

        if (!coupons.hasOwnProperty(code))
            throw new Error('This code is not valid!');

        return coupons[code]();
    }

    _calculateDiscount(percent) {
        return (this._cart.total / 100) * percent;
    }
}
