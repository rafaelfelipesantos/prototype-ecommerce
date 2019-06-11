import Cart from './../Model/Cart.js';
import ProductService from '../Service/ProductService.js';
import Bind from '../Helper/Bind.js';
import ViewItemsFromCart from '../View/ViewItemsFromCart.js';

export default class CartController {
    constructor() {
        const $ = document.querySelector.bind(document);
        this._productService = new ProductService;

        this._$buttonShopNow = $('[data-js="products"]');
        this._$actions = $('[data-js="cart"]');
        
        this._cart = new Bind(
            new Cart, 
            new ViewItemsFromCart($('[data-js="table-items"]')), 
            'add', 'remove', 'changeAmount', 'applyCouponOfDiscount'
        );
        
        this._initEvents();
    }

    _initEvents() {
        this._events();
    }

    _events() {
        this._$buttonShopNow.addEventListener('click', event => 
            this._handleClickShopNow(event), false);

        this._$actions.addEventListener('click', event => 
            this._handleClickRemoveItemFromCart(event), false);

        this._$actions.addEventListener('change', event => 
            this._handleChangeAmount(event), false);

        this._$actions.addEventListener('click', event =>
            this._handleApplyCouponOfDiscount(event), false);

        document.addEventListener('DOMContentLoaded', event =>
            this._handleDOMContentLoaded(event), false);
    }

   async _handleDOMContentLoaded(event) {
        try {
            const data = await this._productService.importProductsFromDB();
            if (data.length)
                data.forEach(product => this._cart.add(product));
        } catch (e) {
            console.warn(e.toString());
        }
    }

    _handleClickShopNow(event) {
        event.preventDefault();
        try {
            this._hasAttribute('data-product-id', async id => {
                if (id) {
                    const product = await this._productService.findById(+id);
                    const inserted = await this._productService.insert(product);
                    this._cart.add(inserted);
                }
            });
        } catch (e) {
            console.warn(e.toString());
        }
    }

    _handleClickRemoveItemFromCart(event) {
        event.preventDefault();
        try {
            this._hasAttribute('data-remove', async id => {
                if (id) {
                    const deleted = await this._productService.delete(+id);
                    this._cart.remove(deleted);
                    event.target.remove();
                }
            });
        } catch (e) {
            console.warn(e.toString());
        }
    }

    _handleChangeAmount(event) {
        event.preventDefault();
        try {
            this._hasAttribute('data-product-id', async id => {
                if (id) {
                    const amount = +event.target.value;
                    const stored = await this._productService.findById(+id);
                    stored._amount = amount;
                    const updated = await this._productService.update(stored);
                    this._cart.changeAmount(+id, amount);
                }
            });
        } catch (e) {
            console.warn(e.toString());
        }
    }

    _handleApplyCouponOfDiscount(event) {
        event.preventDefault();
        try {
            this._hasAttribute('data-discount', hasDiscount => {
                const $code = document.querySelector('[data-js="code"]');
                if (hasDiscount && $code.value)
                    this._cart.applyCouponOfDiscount($code.value);
            });
        } catch (e) {
            console.warn(e.toString());
        }
    }

    _hasAttribute(attribute, callback) {
        if (!event.target.hasAttribute(attribute))
            return callback(null);
        return callback(event.target.getAttribute(attribute));
    }
}
