export const GameState = {
    month: 1,
    year: 1,
    cash: 1000,
    netWorth: 1000,
    salary: 1200, // Salario inicial bajo
    expenses: 800, // Gastos de vida básicos
    jobTitle: 'Reponedor de Supermercado',
    inventory: {
        stocks: [], // { symbol: 'AAPL', quantity: 10, avgPrice: 150 }
        realEstate: [] // { id: 1, name: 'Piso Centro', value: 150000, mortgage: 120000 }
    },
    loans: [], // { id: 1, amount: 5000, interestRate: 0.10, term: 12, remaining: 5000 }

    // Historial para gráficas
    history: {
        netWorth: []
    }
};

export function updateNetWorth() {
    let assets = GameState.cash;

    // Sumar valor de acciones (usando precio actual simulado por ahora)
    GameState.inventory.stocks.forEach(stock => {
        // TODO: Multiplicar por precio real actual
        assets += stock.quantity * stock.avgPrice;
    });

    // Sumar valor de propiedades
    GameState.inventory.realEstate.forEach(property => {
        assets += property.value;
    });

    // Restar deudas (préstamos y hipotecas)
    let liabilities = 0;
    GameState.loans.forEach(loan => {
        liabilities += loan.remaining;
    });
    GameState.inventory.realEstate.forEach(property => {
        if (property.mortgage) liabilities += property.mortgage;
    });

    GameState.netWorth = assets - liabilities;
    return GameState.netWorth;
}
