# Prototype e-commerce 

This project was thought as a proof of concept for the implementation of a shopping cart in JS.

The first step identify the model system classes as Product, Cart and Discount Coupon.

The cart aggregates products, the discount coupon applies the discount on a cart. We're talking about trust, so the discount coupon knows how to apply / calculate the discount on a shopping cart class. The shopping cart knows how to add, remove products as well as how to calculate the total of the sale. The product knows how to estimate its price from its quantity.

In technical terms:

* The MVC pattern was used to separate responsibilities
* An abstraction layer was created to work offline with the shopping cart (GhostDB)
* I can promise that everything will work, so promises were used as well as async / await
* A toy proxy was used to bind the data with the view
* Fetch was used to create an abstraction layer to consume web services (HttpService)
* The node was used in version 12, but all modules are loaded from the browser (Chromium 74)

Reviews and suggestions are always welcome :)
