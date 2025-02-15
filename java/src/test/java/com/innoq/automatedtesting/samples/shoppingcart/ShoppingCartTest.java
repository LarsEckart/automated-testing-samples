package com.innoq.automatedtesting.samples.shoppingcart;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

public class ShoppingCartTest {

    @Test
    public void add() throws InsufficientUnitsInStockException {
        var stock = mock(Stock.class);
        var article1 = mock(Article.class);
        when(stock.availableUnits(article1)).thenReturn(2);
        var currentUser = mock(CurrentUser.class);
        when(currentUser.getCustomerStatus()).thenReturn(CustomerStatus.GOLD);
        var priceCalculator = mock(PriceCalculator.class);
        when(priceCalculator.calculatePrice(article1, CustomerStatus.GOLD)).thenReturn(BigDecimal.valueOf(9.95));
        var shippingCalculator = mock(ShippingCalculator.class);
        when(shippingCalculator.calculateShipping(BigDecimal.valueOf(9.95))).thenReturn(BigDecimal.valueOf(3.5));
        var shoppingCart = new ShoppingCart(stock, currentUser, priceCalculator, shippingCalculator);
        shoppingCart.add(article1, 1);
        var article2 = mock(Article.class);
        when(stock.availableUnits(article2)).thenReturn(3);
        when(priceCalculator.calculatePrice(article2, CustomerStatus.GOLD)).thenReturn(BigDecimal.valueOf(7.5));
        when(shippingCalculator.calculateShipping(BigDecimal.valueOf(32.45))).thenReturn(BigDecimal.valueOf(3.5));
        shoppingCart.add(article2, 3);
        verify(stock).availableUnits(article1);
        verify(stock).availableUnits(article2);
        verify(currentUser, times(2)).getCustomerStatus();
        verify(priceCalculator).calculatePrice(article1, CustomerStatus.GOLD);
        verify(priceCalculator).calculatePrice(article2, CustomerStatus.GOLD);
        verify(shippingCalculator).calculateShipping(BigDecimal.valueOf(9.95));
        verify(shippingCalculator).calculateShipping(BigDecimal.valueOf(32.45));
        assertNotNull(shoppingCart.items());
        assertEquals(2, shoppingCart.items().size());
        assertNotNull(shoppingCart.items().get(0));
        assertEquals(1, shoppingCart.items().get(0).quantity());
        assertEquals(BigDecimal.valueOf(9.95), shoppingCart.items().get(0).amount());
        assertNotNull(shoppingCart.items().get(1));
        assertEquals(3, shoppingCart.items().get(1).quantity());
        assertEquals(BigDecimal.valueOf(22.50), shoppingCart.items().get(1).amount());
        assertEquals(BigDecimal.valueOf(32.45), shoppingCart.subtotalAmount());
        assertEquals(BigDecimal.valueOf(3.5), shoppingCart.shippingAmount());
        assertEquals(BigDecimal.valueOf(35.95), shoppingCart.totalAmount());
    }
}
