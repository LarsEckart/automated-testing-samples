"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCart = void 0;
const Item_1 = require("./Item");
const InsufficientUnitsInStockException = require('./InsufficientUnitsInStockException');
class ShoppingCart {
    constructor(stock, currentUser, priceCalculator, shippingCalculator) {
        this.stock = stock;
        this.currentUser = currentUser;
        this.priceCalculator = priceCalculator;
        this.shippingCalculator = shippingCalculator;
        this.items = [];
        this.subtotalAmount = 0;
        this.shippingAmount = 0;
        this.totalAmount = 0;
    }
    add(article, quantity) {
        const availableUnits = this.stock.availableUnits(article);
        if (quantity > availableUnits)
            throw new Error('InsufficientUnitsInStockException');
        const customerStatus = this.currentUser.customerStatus();
        const price = this.priceCalculator.calculatePrice(article, customerStatus);
        this.items.push(new Item_1.Item(article, quantity, price));
        this.calculateTotals();
    }
    remove(article) {
        try {
            this.changeQuantity(article, 0);
        }
        catch (e) {
            if (e instanceof InsufficientUnitsInStockException) {
                throw new Error(e.message);
            }
            throw e;
        }
        this.calculateTotals();
    }
    changeQuantity(article, quantity) {
        const item = this.items.find(i => i.article === article);
        if (!item)
            throw new Error('Article not in ShoppingCart');
        if (quantity === 0)
            this.items = this.items.filter(i => i !== item);
        else if (quantity > item.quantity && quantity > this.stock.availableUnits(article))
            throw new Error('InsufficientUnitsInStockException');
        else
            item.updateQuantity(quantity);
        this.calculateTotals();
    }
    calculateTotals() {
        this.subtotalAmount = this.items.reduce((total, item) => total + item.amount, 0);
        this.shippingAmount = this.shippingCalculator.calculateShipping(this.subtotalAmount);
        this.totalAmount = this.subtotalAmount + this.shippingAmount;
    }
    getSubtotalAmount() {
        return this.subtotalAmount;
    }
    getShippingAmount() {
        return this.shippingAmount;
    }
    getTotalAmount() {
        return this.totalAmount;
    }
    getItems() {
        return this.items;
    }
    numberOfItems() {
        return this.items.length;
    }
}
exports.ShoppingCart = ShoppingCart;
