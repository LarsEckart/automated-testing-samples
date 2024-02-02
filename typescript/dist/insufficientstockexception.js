"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientUnitsInStockException = void 0;
class InsufficientUnitsInStockException extends Error {
    constructor() {
        super('Insufficient units in stock');
    }
}
exports.InsufficientUnitsInStockException = InsufficientUnitsInStockException;
