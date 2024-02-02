class Item {
    article: any;
    quantity: number;
    price: number;
    amount: number;

    constructor(article: any, quantity: number, price: number) {
        this.article = article;
        this.quantity = quantity;
        this.price = price;
        this.amount = price * quantity;
    }

    getArticleDescription(): string {
        return `${this.article.brand()} - ${this.article.name()} - ${this.article.color()} - ${this.article.size()}`;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getAmount(): number {
        return this.amount;
    }

    updateQuantity(quantity: number): void {
        this.quantity = quantity;
        this.amount = this.price * quantity;
    }

    getArticle(): any {
        return this.article;
    }

    toString(): string {
        return `Item[article=${this.article}]`;
    }
}

export { Item };