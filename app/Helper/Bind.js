import ProxyFactory from './ProxyFactory.js';

/**
 * Bind:
 */
export default class Bind {
    constructor(model, view, ...props) {
        const proxy = ProxyFactory.create(model, props, model => view.render(model));
        view.render(model);
        return proxy;
    }
}
