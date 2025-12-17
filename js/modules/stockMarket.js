export const StockMarket = {
    stocks: [
        { symbol: 'ITX.MC', name: 'Inditex', price: 35.50, trend: 0 },
        { symbol: 'SAN.MC', name: 'Banco Santander', price: 3.80, trend: 0 },
        { symbol: 'TEF.MC', name: 'Telefónica', price: 4.05, trend: 0 },
        { symbol: 'IBE.MC', name: 'Iberdrola', price: 11.20, trend: 0 },
        { symbol: 'AAPL', name: 'Apple Inc.', price: 175.00, trend: 0 },
        { symbol: 'TSLA', name: 'Tesla', price: 210.00, trend: 0 },
        { symbol: 'AMZN', name: 'Amazon', price: 145.00, trend: 0 },
        { symbol: 'NVDA', name: 'NVIDIA', price: 460.00, trend: 0 }
    ],

    // Simula el paso de un mes en el mercado
    nextTurn() {
        this.stocks.forEach(stock => {
            // Volatilidad: -10% a +10%
            const changePercent = (Math.random() * 0.20) - 0.10;

            // Tendencia mensual (momentum)
            // Si el mes pasado subió, hay un 30% de probabilidad de que siga subiendo un poco extra
            const momentum = stock.trend * 0.3;

            let totalChange = changePercent + momentum;

            // Eventos de mercado (Crash o Boom) - 5% de probabilidad
            if (Math.random() < 0.05) {
                const event = Math.random() < 0.5 ? -0.25 : 0.25; // -25% o +25%
                totalChange += event;
            }

            stock.price = stock.price * (1 + totalChange);
            stock.trend = totalChange;

            // Evitar precios negativos o cero
            if (stock.price < 0.10) stock.price = 0.10;
        });
    },

    getStock(symbol) {
        return this.stocks.find(s => s.symbol === symbol);
    }
};

export const Portfolio = {
    // transactions: [], // TODO: Historial

    buy(stockSymbol, quantity, gameState) {
        const stock = StockMarket.getStock(stockSymbol);
        const cost = stock.price * quantity;
        const commission = cost * 0.005; // 0.5% comisión
        const totalCost = cost + commission;

        if (gameState.cash >= totalCost) {
            gameState.cash -= totalCost;

            const existing = gameState.inventory.stocks.find(s => s.symbol === stockSymbol);
            if (existing) {
                // Promediar precio
                const totalValue = (existing.quantity * existing.avgPrice) + cost;
                existing.quantity += quantity;
                existing.avgPrice = totalValue / existing.quantity;
            } else {
                gameState.inventory.stocks.push({
                    symbol: stockSymbol,
                    name: stock.name,
                    quantity: quantity,
                    avgPrice: stock.price
                });
            }
            return { success: true, message: `Has comprado ${quantity} acciones de ${stock.name}` };
        }
        return { success: false, message: 'Dinero insuficiente' };
    },

    sell(stockSymbol, quantity, gameState) {
        const existing = gameState.inventory.stocks.find(s => s.symbol === stockSymbol);
        if (existing && existing.quantity >= quantity) {
            const stock = StockMarket.getStock(stockSymbol);
            const value = stock.price * quantity;
            const commission = value * 0.005;
            const totalReturn = value - commission;

            gameState.cash += totalReturn;
            existing.quantity -= quantity;

            if (existing.quantity === 0) {
                gameState.inventory.stocks = gameState.inventory.stocks.filter(s => s.symbol !== stockSymbol);
            }

            return { success: true, message: `Has vendido ${quantity} acciones de ${stock.name}` };
        }
        return { success: false, message: 'No tienes suficientes acciones' };
    }
};
