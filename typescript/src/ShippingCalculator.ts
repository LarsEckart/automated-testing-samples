class ShippingCalculator {
    calculateShipping(subtotalAmount: number): number {
        return subtotalAmount > 100 ? 0 : subtotalAmount * 0.1;
    }
}

export { ShippingCalculator };