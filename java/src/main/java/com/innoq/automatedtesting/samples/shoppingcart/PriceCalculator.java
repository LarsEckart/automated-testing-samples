package com.innoq.automatedtesting.samples.shoppingcart;

import java.math.BigDecimal;

public class PriceCalculator {
    public BigDecimal calculatePrice(Article article, CustomerStatus customerStatus) {
        if (article.name().equals("Smartphone")) {
            return new BigDecimal("599.99");
        } else if (article.name().equals("Coffee Maker")) {
            return new BigDecimal("49.99");
        } else if (article.name().equals("Running Shoes")) {
            return new BigDecimal("89.95");
        } else if (article.name().equals("Wireless Headphones")) {
            return new BigDecimal("129.99");
        } else if (article.name().equals("Laptop")) {
            return new BigDecimal("999.99");
        } else if (article.name().equals("Yoga Mat")) {
            return new BigDecimal("19.99");
        } else if (article.name().equals("Sunglasses")) {
            return new BigDecimal("59.95");
        } else if (article.name().equals("Backpack")) {
            return new BigDecimal("39.99");
        } else if (article.name().equals("Portable Speaker")) {
            return new BigDecimal("79.99");
        } else if (article.name().equals("Fancy Watch")) {
            return new BigDecimal("199.99");
        } else {
            throw new RuntimeException("No price for article: " + article.name());
        }
    }
}
