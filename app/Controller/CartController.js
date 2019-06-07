import Cart from './../Model/Cart.js';
import Product from './../Model/Product.js';
import ProductService from '../Service/ProductService.js';
import Bind from '../Helper/Bind.js';
import ViewItemsFromCart from '../View/ViewItemsFromCart.js';

export default class CartController {
    constructor() {
        const $ = document.querySelector.bind(document);
        this._$buttonShopNow = $('[data-js="products"]');
        this._$actions = $('[data-js="cart"]');
        this._cart = new Bind(
            new Cart, 
            new ViewItemsFromCart($('[data-js="table-items"]')), 
            'add', 'remove', 'changeAmount', 'applyCouponOfDiscount'
        );
        this._productService = new ProductService;
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
    }

    async _handleClickShopNow(event) {
        event.preventDefault();
        try {
            const id = await this._hasAttribute('data-product-id');
            const product = await this._productService.getById(+id);
            this._cart.add(new Product(product));
        } catch (e) {
            console.warn(e.toString());
        }
    }

    async _handleClickRemoveItemFromCart(event) {
        event.preventDefault();
        try {
            const id = await this._hasAttribute('data-remove');
            this._cart.remove(+id);
            event.target.remove();
        } catch (e) {
            console.warn(e.toString());
        }
    }

    async _handleChangeAmount(event) {
        event.preventDefault();
        try {
            const id = await this._hasAttribute('data-product-id');
            this._cart.changeAmount(+id, +event.target.value);
        } catch (e) {
            console.warn(e.toString());
        }
    }

    async _handleApplyCouponOfDiscount(event) {
        event.preventDefault();
        try {
            const hasDiscount = await this._hasAttribute('data-discount');
            const $code = document.querySelector('[data-js="code"]');

            if (hasDiscount && $code.value)
                this._cart.applyCouponOfDiscount($code.value);
        } catch (e) {
            console.warn(e.toString());
        }
    }

    _hasAttribute(attribute) {
        return new Promise(resolve => {
            if (event.target.hasAttribute(attribute))
                resolve(event.target.getAttribute(attribute));
        });
    }
}
