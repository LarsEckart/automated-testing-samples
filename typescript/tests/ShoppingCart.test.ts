import {afterEach, describe, expect, it, vi} from 'vitest'

import {ShoppingCart} from '../src/ShoppingCart';
import {Stock} from '../src/Stock';
import {CurrentUser} from '../src/CurrentUser';
import {PriceCalculator} from "../src/PriceCalculator";
import {ShippingCalculator} from "../src/ShippingCalculator";
import {Article} from "../src/Article";
import {CustomerStatus} from "../src/CustomerStatus";

describe('ShoppingCart', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('add', () => {
        const stock = new Stock()
        const spyStock = vi.spyOn(stock, 'availableUnits')
        spyStock.mockImplementationOnce(() => 2).mockImplementationOnce(() => 3)
        const currentUser1 = new CurrentUser(CustomerStatus.GOLD);
        let priceCalculator = new PriceCalculator();
        const spyPriceCalculator = vi.spyOn(priceCalculator, 'calculatePrice')
        spyPriceCalculator.mockImplementationOnce(() => 9.95).mockImplementationOnce(() => 7.5)
        let shippingCalculator = new ShippingCalculator();
        const spyShippingCalculator = vi.spyOn(shippingCalculator, 'calculateShipping')
        spyShippingCalculator.mockImplementationOnce(() => 3.5).mockImplementationOnce(() => 3.5)
        const article1 = new Article('', '', '', '');
        const article2 = new Article('', '', '', '');
        const shoppingCart = new ShoppingCart(stock, currentUser1, priceCalculator, shippingCalculator);
        shoppingCart.add(article1, 1)
        shoppingCart.add(article2, 3)
        expect(spyStock).toHaveBeenCalledWith(article1)
        expect(spyStock).toHaveBeenCalledWith(article2)
        expect(spyPriceCalculator).toHaveBeenCalledWith(article1, CustomerStatus.GOLD)
        expect(spyPriceCalculator).toHaveBeenCalledWith(article2, CustomerStatus.GOLD)
        expect(spyShippingCalculator).toHaveBeenCalledWith(9.95)
        expect(spyShippingCalculator).toHaveBeenCalledWith(32.45)
        expect(shoppingCart.numberOfItems()).toBe(2)
        expect(shoppingCart.getItems()).toBeDefined()
        expect(shoppingCart.getItems()[0]).toBeDefined()
        expect(shoppingCart.getItems()[0].quantity).toBe(1)
        expect(shoppingCart.getItems()[0].amount).toBe(9.95)
        expect(shoppingCart.getItems()[1]).toBeDefined()
        expect(shoppingCart.getItems()[1].quantity).toBe(3)
        expect(shoppingCart.getItems()[1].amount).toBe(22.5)
        expect(shoppingCart.getSubtotalAmount()).toBe(32.45)
        expect(shoppingCart.getShippingAmount()).toBe(3.5)
        expect(shoppingCart.getTotalAmount()).toBe(35.95)
    })
});
