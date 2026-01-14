class SortStrategy {
    constructor() {
        this.strategy = null;
    }

    setStrategy(strategyInfo) {
        if (strategyInfo === 'name') {
            this.strategy = { title: 1 }; // MongoDB sort syntax
        } else if (strategyInfo === 'date') {
            this.strategy = { year: 1 };
        } else {
            this.strategy = { _id: -1 }; // Default: Newest first
        }
    }

    getSortQuery() {
        return this.strategy;
    }
}

module.exports = new SortStrategy();