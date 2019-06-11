/**
 * ProxyFactory:
 */
export default class ProxyFactory {
    static create(instance, props, callback) {
        return new Proxy(instance, {
            get(target, property, receiver) {
                const method = Reflect.get(...arguments);
                if (typeof method === 'function' && props.includes(property)) {
                    return function(...args) {
                        Reflect.apply(method, target, args);
                        callback(target);
                    }
                }
                return Reflect.get(...arguments);
            }, 

            set(target, property, value, receiver) {
                return Reflect.set(...arguments);
            }
        });
    }
}
