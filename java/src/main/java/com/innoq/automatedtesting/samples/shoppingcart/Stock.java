package com.innoq.automatedtesting.samples.shoppingcart;

import java.util.Random;

public class Stock {
    public int availableUnits(Article article) {
        return new Random().nextInt(10);
    }
}
