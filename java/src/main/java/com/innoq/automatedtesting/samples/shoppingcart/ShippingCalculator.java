package com.innoq.automatedtesting.samples.shoppingcart;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Random;

public class ShippingCalculator {
    public BigDecimal calculateShipping(BigDecimal subtotalAmount) {
        Random random = new Random();
        BigDecimal randomNumber = BigDecimal.valueOf(random.nextDouble()).setScale(2, RoundingMode.HALF_UP);
        BigDecimal randomNumber2 = BigDecimal.valueOf(random.nextDouble()).setScale(2, RoundingMode.HALF_UP);
        return randomNumber.compareTo(new BigDecimal("0.7")) < 0 ?
                (randomNumber2.compareTo(new BigDecimal("0.3")) < 0 ? new BigDecimal("10") : new BigDecimal("5")) :
                BigDecimal.ZERO;
    }
}
