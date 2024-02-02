import {afterEach, describe, expect, it, vi} from 'vitest'

import {ShoppingCart} from '../src/shoppingcart';
import {Stock} from '../src/stock';
import {CurrentUser} from '../src/CurrentUser';
import {PriceCalculator} from "../src/pricecalculator";
import {ShippingCalculator} from "../src/shippingcalculator";
import {Article} from "../src/article";
import {CustomerStatus} from "../src/customerstatus";

describe('ShoppingCart', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('add', () => {
        const stock = new Stock()
        const spyStock = vi.spyOn(stock, 'availableUnits')
        spyStock.mockImplementationOnce(() => 2).mockImplementationOnce(() => 3)
        const currentUser1 = new CurrentUser();
        const spyCurrentUser = vi.spyOn(currentUser1, 'customerStatus')
        spyCurrentUser.mockImplementation(() => CustomerStatus.GOLD)
        let priceCalculator = new PriceCalculator();
        const spyPriceCalculator = vi.spyOn(priceCalculator, 'calculatePrice')
        spyPriceCalculator.mockImplementationOnce(() => 9.95).mockImplementationOnce(() => 7.5)
        let shippingCalculator = new ShippingCalculator();
        const spyShippingCalculator = vi.spyOn(shippingCalculator, 'calculateShipping')
        spyShippingCalculator.mockImplementationOnce(() => 3.5).mockImplementationOnce(() => 3.5)
        const article1 = new Article()
        const article2 = new Article()
        const shoppingCart = new ShoppingCart(stock, currentUser1, priceCalculator, shippingCalculator);
        shoppingCart.add(article1, 1)
        shoppingCart.add(article2, 3)
        expect(spyStock).toHaveBeenCalledWith(article1)
        expect(spyStock).toHaveBeenCalledWith(article2)
        expect(spyCurrentUser).toHaveBeenCalledTimes(2)
        expect(spyPriceCalculator).toHaveBeenCalledWith(article1, CustomerStatus.GOLD)
        expect(spyPriceCalculator).toHaveBeenCalledWith(article2, CustomerStatus.GOLD)
        expect(spyShippingCalculator).toHaveBeenCalledWith(9.95)
        expect(spyShippingCalculator).toHaveBeenCalledWith(32.45)
        expect(shoppingCart.numberOfItems()).toBe(2)
        expect(shoppingCart.getItems()[0].quantity).toBe(1)
        expect(shoppingCart.getItems()[0].amount).toBe(9.95)
        expect(shoppingCart.getItems()[1].quantity).toBe(3)
        expect(shoppingCart.getItems()[1].amount).toBe(22.5)
        expect(shoppingCart.getSubtotalAmount()).toBe(32.45)
        expect(shoppingCart.getShippingAmount()).toBe(3.5)
        expect(shoppingCart.getTotalAmount()).toBe(35.95)
    })
});
