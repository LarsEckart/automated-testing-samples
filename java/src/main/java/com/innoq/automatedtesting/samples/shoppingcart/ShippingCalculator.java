package com.innoq.automatedtesting.samples.shoppingcart;

import java.math.BigDecimal;

public class ShippingCalculator {
    public BigDecimal calculateShipping(BigDecimal amount) {
        if (amount.compareTo(new BigDecimal(100)) > 0) {
            return BigDecimal.ZERO;
        }
        return amount.multiply(new BigDecimal("0.1"));
    }
}
