import View from './View.js';

/**
 * ViewItemFromCart:
 */
export default class ViewItemsFromCart extends View {
    constructor(element) {
        super(element);
    }

    template(cart) {
        return `
        <table>
            <thead>
                <tr>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody data-js="tbody">
                ${cart.items.map(item => 
                    `<tr data-product-id="${item._id}">
                        <td>
                            <div class="cart-item">
                                <div class="wrapper-img">
                                    <img src="${item._photo}" alt="${item._title}">       
                                </div>
                                <div class="cart-item-content">
                                    <h1>${item._title}</h1>
                                </div>
                            </div>
                        </td>
                        <td>
                            <select data-product-id="${item._id}">
                                ${[1, 2, 3].map(number => {
                                    return number === item._amount 
                                    ? `<option selected value="${number}">${number}</option>` 
                                    : `<option value="${number}">${number}</option>`
                                }).join('')}
                            </select>
                        </td>
                        <td>${(new Intl.NumberFormat()).format(item.total())}</td>
                        <td>
                            <a data-remove="${item._id}" href="#" class="btn bg-yellow">Remove</a>
                        </td>
                    </tr>`
                ).join('')}
            </tbody>
            <tfoot>
                <td colspan="3">Subtotal</td>
                <td>${(new Intl.NumberFormat()).format(cart.total)}</td>
            </tfoot>
        </table>`;
    }
}
