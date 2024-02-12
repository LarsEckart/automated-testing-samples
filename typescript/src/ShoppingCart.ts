import {Article} from './Article';
import {Stock} from './Stock';
import {CurrentUser} from './CurrentUser';
import {PriceCalculator} from './PriceCalculator';
import {ShippingCalculator} from './ShippingCalculator';
import {Item} from './Item';

import {InsufficientUnitsInStockException} from './InsufficientUnitsInStockException';

class ShoppingCart {
    private stock: Stock;
    private currentUser: CurrentUser;
    private priceCalculator: PriceCalculator;
    private shippingCalculator: ShippingCalculator;

    private items: Item[];
    private subtotalAmount: number;
    private shippingAmount: number;
    private totalAmount: number;

    constructor(stock: Stock, currentUser: CurrentUser, priceCalculator: PriceCalculator, shippingCalculator: ShippingCalculator) {
        this.stock = stock;
        this.currentUser = currentUser;
        this.priceCalculator = priceCalculator;
        this.shippingCalculator = shippingCalculator;

        this.items = [];
        this.subtotalAmount = 0;
        this.shippingAmount = 0;
        this.totalAmount = 0;
    }

    add(article: Article, quantity: number): void {
        const availableUnits = this.stock.availableUnits(article);
        if (quantity > availableUnits)
            throw new Error('InsufficientUnitsInStockException');
        const price = this.priceCalculator.calculatePrice(article, this.currentUser.customerStatus);
        this.items.push(new Item(article, quantity, price));
        this.calculateTotals();
    }

    remove(article: Article): void {
        try {
            this.changeQuantity(article, 0);
        } catch (e) {
            if (e instanceof InsufficientUnitsInStockException) {
                throw new Error((e as Error).message);
            }
            throw e;
        }
        this.calculateTotals();
    }

    changeQuantity(article: Article, quantity: number): void {
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

    private calculateTotals(): void {
        this.subtotalAmount = this.items.reduce((total, item) => total + item.amount, 0);
        this.shippingAmount = this.shippingCalculator.calculateShipping(this.subtotalAmount);
        this.totalAmount = this.subtotalAmount + this.shippingAmount;
    }

    getSubtotalAmount(): number {
        return this.subtotalAmount;
    }

    getShippingAmount(): number {
        return this.shippingAmount;
    }

    getTotalAmount(): number {
        return this.totalAmount;
    }

    getItems(): Item[] {
        return this.items;
    }

    numberOfItems(): number {
        return this.items.length;
    }
}

export {ShoppingCart};