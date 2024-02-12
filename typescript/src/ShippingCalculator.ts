class ShippingCalculator {
    calculateShipping(subtotalAmount: number): number {
        const randomNumber = Math.random();
        const randomNumber2 = Math.random();
        return randomNumber < 0.7 ? randomNumber2 < 0.3 ? 10 : 5 : 0;
    }
}

export { ShippingCalculator };