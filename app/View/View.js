/**
 * View:
 */
export default class View {
    constructor(element) {
        this._$element = element;
    }

    template(data) {
        throw new Error('Abstract method!');
    }

    render(model) {
        this._$element.innerHTML = this.template(model);
    }
}
