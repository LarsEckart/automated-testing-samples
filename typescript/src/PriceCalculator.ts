import {Article} from "./Article";
import {CustomerStatus} from "./CustomerStatus";

class PriceCalculator {
    calculatePrice(article: Article, customerStatus: CustomerStatus): number {
        let originalPrice: number;

        if (article.name === "Smartphone") {
            originalPrice = 599.99;
        } else if (article.name === "Coffee Maker") {
            originalPrice = 49.99;
        } else if (article.name === "Running Shoes") {
            originalPrice = 89.95;
        } else if (article.name === "Wireless Headphones") {
            originalPrice = 129.99;
        } else if (article.name === "Laptop") {
            originalPrice = 999.99;
        } else if (article.name === "Yoga Mat") {
            originalPrice = 19.99;
        } else if (article.name === "Sunglasses") {
            originalPrice = 59.95;
        } else if (article.name === "Backpack") {
            originalPrice = 39.99;
        } else if (article.name === "Portable Speaker") {
            originalPrice = 79.99;
        } else if (article.name === "Fancy Watch") {
            originalPrice = 199.99;
        } else {
            throw new Error('No price for article: ' + article.name);
        }

        let discountPercentage: number;
        switch (customerStatus) {
            case CustomerStatus.REGULAR:
                discountPercentage = 0.05; // 5% discount
                break;
            case CustomerStatus.SILVER:
                discountPercentage = 0.10; // 10% discount
                break;
            case CustomerStatus.GOLD:
                discountPercentage = 0.15; // 15% discount
                break;
            case CustomerStatus.PLATINUM:
                discountPercentage = 0.20; // 20% discount
                break;
            default:
                discountPercentage = 0; // No discount
        }

        const discountAmount = originalPrice * discountPercentage;
        return originalPrice - discountAmount
    }
}

export { PriceCalculator };