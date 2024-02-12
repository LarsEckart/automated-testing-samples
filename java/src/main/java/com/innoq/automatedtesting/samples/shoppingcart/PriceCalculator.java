package com.innoq.automatedtesting.samples.shoppingcart;

import java.math.BigDecimal;

public class PriceCalculator {
    public BigDecimal calculatePrice(Article article, CustomerStatus customerStatus) {
        BigDecimal originalPrice;

        switch (article.name()) {
            case "Smartphone":
                originalPrice = new BigDecimal("599.99");
                break;
            case "Coffee Maker":
                originalPrice = new BigDecimal("49.99");
                break;
            case "Running Shoes":
                originalPrice = new BigDecimal("89.95");
                break;
            case "Wireless Headphones":
                originalPrice = new BigDecimal("129.99");
                break;
            case "Laptop":
                originalPrice = new BigDecimal("999.99");
                break;
            case "Yoga Mat":
                originalPrice = new BigDecimal("19.99");
                break;
            case "Sunglasses":
                originalPrice = new BigDecimal("59.95");
                break;
            case "Backpack":
                originalPrice = new BigDecimal("39.99");
                break;
            case "Portable Speaker":
                originalPrice = new BigDecimal("79.99");
                break;
            case "Fancy Watch":
                originalPrice = new BigDecimal("199.99");
                break;
            default:
                throw new RuntimeException("No price for article: " + article.name());
        }

        BigDecimal discountPercentage;
        switch (customerStatus) {
            case REGULAR:
                discountPercentage = new BigDecimal("0.05"); // 5% discount
                break;
            case SILVER:
                discountPercentage = new BigDecimal("0.10"); // 10% discount
                break;
            case GOLD:
                discountPercentage = new BigDecimal("0.15"); // 15% discount
                break;
            case PLATINUM:
                discountPercentage = new BigDecimal("0.20"); // 20% discount
                break;
            default:
                discountPercentage = BigDecimal.ZERO; // No discount
        }

        BigDecimal discountAmount = originalPrice.multiply(discountPercentage);
        return originalPrice.subtract(discountAmount);
    }
}
