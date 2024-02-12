export class InsufficientUnitsInStockException extends Error {
    constructor() {
        super('Insufficient units in stock');
    }
}
