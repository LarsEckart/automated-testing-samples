import { Article } from './article';

class Stock {
    availableUnits(article: Article): number {
        return Math.floor(Math.random() * 10) + 1;
    }
}

export { Stock };