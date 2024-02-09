class PriceCalculator {
    calculatePrice(article: any, customerStatus: any): any {
        if (article.name() === "Smartphone") {
            return 599.99;
        } else if (article.name() === "Coffee Maker") {
            return 49.99;
        } else if (article.name() === "Running Shoes") {
            return 89.95;
        } else if (article.name() === "Wireless Headphones") {
            return 129.99;
        } else if (article.name() === "Laptop") {
            return 999.99;
        } else if (article.name() === "Yoga Mat") {
            return 19.99;
        } else if (article.name() === "Sunglasses") {
            return 59.95;
        } else if (article.name() === "Backpack") {
            return 39.99;
        } else if (article.name() === "Portable Speaker") {
            return 79.99;
        } else if (article.name() === "Fancy Watch") {
            return 199.99;
        } else {
            throw new Error('No price for article: ' + article.name());
        }
    }
}

export { PriceCalculator };