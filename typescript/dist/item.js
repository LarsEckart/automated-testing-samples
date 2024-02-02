"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(article, quantity, price) {
        this.article = article;
        this.quantity = quantity;
        this.price = price;
        this.amount = price * quantity;
    }
    getArticleDescription() {
        return `${this.article.brand()} - ${this.article.name()} - ${this.article.color()} - ${this.article.size()}`;
    }
    getQuantity() {
        return this.quantity;
    }
    getAmount() {
        return this.amount;
    }
    updateQuantity(quantity) {
        this.quantity = quantity;
        this.amount = this.price * quantity;
    }
    getArticle() {
        return this.article;
    }
    toString() {
        return `Item[article=${this.article}]`;
    }
}
exports.Item = Item;
