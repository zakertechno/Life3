console.log("CRITICAL DEBUG: SCRIPT STARTED");
/*******************************************************
 * ENDGAME SYSTEM (YEAR 50)
 *******************************************************/
function showEndgameModal() {
    const stats = GameState.lifetimeStats;

    // Calculate real estate profit
    const realEstateProfit = (stats.realEstate && stats.realEstate.totalSales && stats.realEstate.totalPurchases)
        ? stats.realEstate.totalSales - stats.realEstate.totalPurchases
        : 0;

    const totalIncome = stats.totalIncome.salary + stats.totalIncome.rental + stats.totalIncome.stocks + stats.totalIncome.company + realEstateProfit;
    const totalExpenses = stats.totalExpenses.lifestyle + stats.totalExpenses.housing + stats.totalExpenses.education;

    const summary = `
                <div style="text-align: center; padding: 15px; max-height: 75vh; overflow-y: auto;">
                    <div style="font-size: 2.5rem; margin-bottom: 5px;">☠️</div>
                    <h2 style="color: #f87171; margin: 0 0 3px 0; font-size: 1.4rem;">Has Muerto - Año 50</h2>
                    <p style="color: #4ade80; margin: 5px 0; font-size: 1rem; font-weight: 600;">
                        Has llegado a tener un patrimonio de ${formatCurrency(GameState.netWorth)}
                    </p>
                    <p style="color: #38bdf8; margin: 0 0 12px 0; font-size: 0.95rem; font-weight: bold;">
                        ¡ENHORABUENA!
                    </p>
                    <p style="color: #94a3b8; margin: 0 0 12px 0; font-size: 0.85rem;">
                        Gracias por jugar, pero seguro que podrías haberlo hecho mejor...
                    </p>
                    
                    <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 8px; padding: 10px; margin: 8px auto; max-width: 400px;">
                        <h3 style="color: #4ade80; margin: 0 0 8px 0; font-size: 0.9rem; font-weight: 600;">💰 Ingresos Totales de tu Vida</h3>
                        <div style="display: flex; justify-content: space-between; margin: 4px 0; font-size: 0.8rem;">
                            <span>💼 Salarios:</span>
                            <strong style="color: #4ade80;">${formatCurrency(stats.totalIncome.salary)}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin: 4px 0; font-size: 0.8rem;">
                            <span>🏠 Alquileres:</span>
                            <strong style="color: #4ade80;">${formatCurrency(stats.totalIncome.rental)}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin: 4px 0; font-size: 0.8rem;">
                            <span>📈 Bolsa:</span>
                            <strong style="color: #4ade80;">${formatCurrency(stats.totalIncome.stocks)}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin: 4px 0; font-size: 0.8rem;">
                            <span>🏢 Empresas:</span>
                            <strong style="color: #4ade80;">${formatCurrency(stats.totalIncome.company)}</strong>
                        </div>
                        ${(stats.realEstate && stats.realEstate.propertiesSold > 0) ? `
                        <div style="margin: 8px 0; padding: 8px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 6px;">
                            <div style="font-size: 0.75rem; color: #38bdf8; font-weight: 600; margin-bottom: 4px;">
                                🏘️ Operaciones Inmobiliarias (${stats.realEstate.propertiesSold} inmuebles)
                            </div>
                            <div style="display: flex; justify-content: space-between; margin: 2px 0; font-size: 0.75rem; color: #94a3b8;">
                                <span>Precio Compra:</span>
                                <span>${formatCurrency(stats.realEstate.totalPurchases || 0)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin: 2px 0; font-size: 0.75rem; color: #94a3b8;">
                                <span>Precio Venta:</span>
                                <span>${formatCurrency(stats.realEstate.totalSales || 0)}</span>
                            </div>
                            <div style="height: 1px; background: rgba(56, 189, 248, 0.3); margin: 4px 0;"></div>
                            <div style="display: flex; justify-content: space-between; margin: 2px 0; font-size: 0.8rem; font-weight: 600;">
                                <span style="color: #38bdf8;">Beneficio Neto:</span>
                                <strong style="color: ${realEstateProfit >= 0 ? '#4ade80' : '#f87171'};">
                                    ${formatCurrency(realEstateProfit)} 
                                    ${stats.realEstate.totalPurchases > 0 ? `(${((realEstateProfit / stats.realEstate.totalPurchases) * 100).toFixed(1)}%)` : ''}
                                </strong>
                            </div>
                        </div>
                        ` : ''}
                        <div style="height: 1px; background: #334155; margin: 6px 0;"></div>
                        <div style="display: flex; justify-content: space-between; margin: 4px 0; font-size: 0.9rem; font-weight: 600;">
                            <span>Total Ingresos:</span>
                            <strong style="color: #4ade80;">${formatCurrency(totalIncome)}</strong>
                        </div>
                    </div>
                    
                    <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 8px; padding: 10px; margin: 8px auto; max-width: 400px;">
                        <h3 style="color: #f87171; margin: 0 0 8px 0; font-size: 0.9rem; font-weight: 600;">💸 Gastos Totales de tu Vida</h3>
                        <div style="display: flex; justify-content: space-between; margin: 4px 0; font-size: 0.8rem;">
                            <span>🛍️ Estilo de Vida:</span>
                            <strong style="color: #f87171;">${formatCurrency(stats.totalExpenses.lifestyle)}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin: 4px 0; font-size: 0.8rem;">
                            <span>🏠 Vivienda:</span>
                            <strong style="color: #f87171;">${formatCurrency(stats.totalExpenses.housing)}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin: 4px 0; font-size: 0.8rem;">
                            <span>🎓 Formación:</span>
                            <strong style="color: #f87171;">${formatCurrency(stats.totalExpenses.education)}</strong>
                        </div>
                        <div style="height: 1px; background: #334155; margin: 6px 0;"></div>
                        <div style="display: flex; justify-content: space-between; margin: 4px 0; font-size: 0.9rem; font-weight: 600;">
                            <span>Total Gastos:</span>
                            <strong style="color: #f87171;">${formatCurrency(totalExpenses)}</strong>
                        </div>
                    </div>
                    
                    <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 8px; padding: 10px; margin: 8px auto; max-width: 400px;">
                        <h3 style="color: #fbbf24; margin: 0 0 8px 0; font-size: 0.9rem; font-weight: 600;">📋 Impuestos Pagados</h3>
                        <div style="display: flex; justify-content: space-between; margin: 4px 0; font-size: 0.9rem; font-weight: 600;">
                            <span>Total Pagado al Estado:</span>
                            <strong style="color: #fbbf24;">${formatCurrency(stats.totalTaxesPaid)}</strong>
                        </div>
                    </div>
                    
                    <p style="color: #38bdf8; margin: 12px 0 0 0; font-size: 0.9rem;">
                        ¿Por qué no lo intentas de nuevo tomando otras decisiones?
                    </p>
                </div>
            `;

    UI.showModal(
        '🎮 Fin del Juego',
        summary,
        [{ text: '🔄 Reiniciar Juego', style: 'primary', fn: resetGame }]
    );
}

function resetGame() {
    // Confirm reset
    if (!confirm('¿Estás seguro de que quieres reiniciar el juego? Se perderán todos los datos.')) {
        return;
    }

    // Clear localStorage
    localStorage.removeItem('gameState');
    localStorage.removeItem('playerName');

    // Reload page to restart
    location.reload();
}

/*******************************************************
 * STATE
 *******************************************************/
var GameState = {
    playerName: 'Inversor',
    month: 1,
    year: 1,
    cash: 500,
    netWorth: 500,
    salary: 0,
    expenses: 0,
    lifestyle: {
        housing: 'parents', // 0
        food: 'scraps', // 0 (Mama)
        transport: 'walk', // 0
        leisure: 'free', // 0
        clothes: 'donations' // 0
    },
    jobTitle: 'Desempleado',
    inventory: {
        stocks: [],
        realEstate: []
    },
    loans: [],
    // Phase 2
    age: 16,
    education: ['ESO'],
    currentGigs: [], // Persist monthly gigs
    isStudying: false,
    currentCourse: null, // { name: 'FP Informática', remainingMonths: 12, costMonthly: 0 }
    history: {
        netWorth: [500],
        cash: [500],
        assets: [0],
        debt: [0],
        labels: ['Inicio']
    },
    tutorialState: {
        initial: false,
        education: false,
        job: false,
        market: false,
        realEstate: false,
        company: false,
        forceHousing: false
    },

    // ANNUAL INCOME TRACKING FOR TAXES
    currentYearIncome: {
        salary: 0,
        rental: 0,
        stocks: 0,
        company: 0
    },
    previousYearIncome: {
        salary: 0,
        rental: 0,
        stocks: 0,
        company: 0
    },
    taxWarningShown: false,

    // EXPROPRIATION TRACKING
    expropriation500kDone: false,
    expropriation1MDone: false,
    expropriation3MDone: false,

    // LIFETIME STATISTICS (for endgame summary)
    lifetimeStats: {
        totalIncome: { salary: 0, rental: 0, stocks: 0, company: 0 },
        totalExpenses: { lifestyle: 0, housing: 0, education: 0 },
        totalTaxesPaid: 0,
        realEstate: {
            totalPurchases: 0,  // Total spent buying properties that were sold
            totalSales: 0,      // Total received from selling properties
            propertiesSold: 0   // Count of properties sold
        }
    },

    // Job Persistence
    currentCareerPath: 'none',
    monthsInCurrentJob: 0,
    monthsSinceLastRaise: 0,

    // Story & Unlocks
    totalMonths: 0,
    expensesUnlocked: false,
};

function updateNetWorth() {
    let assets = GameState.cash;
    GameState.inventory.stocks.forEach(stock => {
        const liveStock = StockMarket.getStock(stock.symbol);
        const currentPrice = liveStock ? liveStock.price : stock.avgPrice;
        assets += stock.quantity * currentPrice;
    });
    GameState.inventory.realEstate.forEach(property => {
        assets += property.price; // Use price or value
    });
    let liabilities = 0;
    GameState.loans.forEach(loan => {
        liabilities += loan.remainingBalance;
    });

    GameState.netWorth = assets - liabilities;
    return GameState.netWorth;
}

/*******************************************************
 * CHART MODULE (Simple Canvas Header)
 *******************************************************/
/*******************************************************
 * CHART MODULE (Premium Chart.js)
 *******************************************************/
var ChartModule = {
    instance: null,

    drawChart(canvasId, history) {
        const ctx = document.getElementById(canvasId).getContext('2d');

        // Destroy previous to avoid overlay
        if (this.instance) {
            this.instance.destroy();
        }

        // Gradients
        const gradientNW = ctx.createLinearGradient(0, 0, 0, 400);
        gradientNW.addColorStop(0, 'rgba(250, 204, 21, 0.5)'); // Yellow/Gold
        gradientNW.addColorStop(1, 'rgba(250, 204, 21, 0.0)');

        const gradientCash = ctx.createLinearGradient(0, 0, 0, 400);
        gradientCash.addColorStop(0, 'rgba(74, 222, 128, 0.4)'); // Green
        gradientCash.addColorStop(1, 'rgba(74, 222, 128, 0.0)');

        this.instance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: history.labels,
                datasets: [
                    {
                        label: 'P/n',
                        data: history.netWorth,
                        borderColor: '#facc15',
                        backgroundColor: gradientNW,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0
                    },
                    {
                        label: 'Liquidez',
                        data: history.cash,
                        borderColor: '#4ade80', // Green
                        backgroundColor: gradientCash,
                        borderWidth: 2,
                        borderDash: [5, 5],
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0
                    },
                    {
                        label: 'Deuda',
                        data: history.debt,
                        borderColor: '#f87171', // Red
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8' }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        titleColor: '#f1f5f9',
                        bodyColor: '#cbd5e1',
                        borderColor: '#334155',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        grid: { color: '#334155' },
                        ticks: { color: '#94a3b8', maxTicksLimit: 8 }
                    },
                    y: {
                        grid: { color: '#334155' },
                        ticks: {
                            color: '#94a3b8',
                            callback: (val) => formatCurrency(val, 0) // Force integer
                        }
                    }
                }
            }
        });
    },
    drawStockChart(canvasId, stock, timeframe) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        if (this.instanceStock) {
            this.instanceStock.destroy();
        }

        let data = stock.history || [];
        let labels = Array.from({ length: data.length }, (_, i) => i);

        // Limit data
        if (timeframe !== 999) { // 999 = MAX
            data = data.slice(-timeframe);
            labels = labels.slice(-timeframe);
        }

        if (data.length === 0) return;

        const startPrice = data[0];
        const endPrice = data[data.length - 1];
        const isPositive = endPrice >= startPrice;
        const color = isPositive ? '#4ade80' : '#f87171';
        const bgColor = isPositive ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)';

        this.instanceStock = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    borderColor: color,
                    backgroundColor: bgColor,
                    borderWidth: 2,
                    fill: true,
                    pointRadius: 0,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
                scales: {
                    x: { display: false },
                    y: { display: false } // Minimalist sparkline style or show ticks? User said "historial", imply detail.
                    // Let's show Y ticks for readability
                }
            }
        });
    }
};

/*******************************************************
 * PERSISTENCE MODULE
 *******************************************************/
var PersistenceModule = {
    SAVE_KEY_AUTO: 'inversion_game_auto',
    SAVE_KEY_SLOT1: 'inversion_game_slot1',
    SAVE_KEY_SLOT2: 'inversion_game_slot2',
    SAVE_KEY: 'inversion_game_auto', // Default for backwards compatibility

    // Get all available saves
    getAllSaves() {
        const saves = [];
        const keys = [
            { key: this.SAVE_KEY_AUTO, name: 'Auto-Guardado', isAuto: true },
            { key: this.SAVE_KEY_SLOT1, name: 'Slot 1', isAuto: false },
            { key: this.SAVE_KEY_SLOT2, name: 'Slot 2', isAuto: false }
        ];

        keys.forEach(slot => {
            const data = localStorage.getItem(slot.key);
            if (data) {
                try {
                    const parsed = JSON.parse(data);
                    saves.push({
                        key: slot.key,
                        name: slot.name,
                        isAuto: slot.isAuto,
                        data: parsed,
                        playerName: parsed.playerName || 'Desconocido',
                        cash: parsed.cash || 0,
                        year: parsed.year || 1,
                        month: parsed.month || 1,
                        savedAt: parsed.savedAt || null
                    });
                } catch (e) {
                    console.error('Error parsing save:', slot.key, e);
                }
            }
        });

        return saves;
    },

    // Save to specific slot
    saveToSlot(slotKey) {
        try {
            const dataToSave = { ...GameState, savedAt: new Date().toISOString() };
            const data = JSON.stringify(dataToSave);
            localStorage.setItem(slotKey, data);
            return { success: true, message: 'Partida guardada correctamente.' };
        } catch (e) {
            return { success: false, message: 'Error al guardar: ' + e.message };
        }
    },

    // Load from specific slot
    loadFromSlot(slotKey) {
        try {
            const data = localStorage.getItem(slotKey);
            if (!data) return { success: false, message: 'No hay partida en este slot.' };
            const loadedState = JSON.parse(data);
            Object.assign(GameState, loadedState);
            return { success: true, message: `Bienvenido de nuevo, ${GameState.playerName}` };
        } catch (e) {
            return { success: false, message: 'Error al cargar: ' + e.message };
        }
    },

    // Auto-save (used by the game loop)
    saveGame() {
        return this.saveToSlot(this.SAVE_KEY_AUTO);
    },

    // Load from auto-save (backwards compatibility)
    loadGame() {
        return this.loadFromSlot(this.SAVE_KEY_AUTO);
    },

    // Check if any save exists
    checkSave() {
        return this.getAllSaves().length > 0;
    },

    // Delete a specific slot
    deleteSlot(slotKey) {
        localStorage.removeItem(slotKey);
    },

    // Clear all saves
    resetGame() {
        localStorage.removeItem(this.SAVE_KEY_AUTO);
        localStorage.removeItem(this.SAVE_KEY_SLOT1);
        localStorage.removeItem(this.SAVE_KEY_SLOT2);
        location.reload();
    },

    // Show save slots modal for manual saving
    showSaveModal() {
        const saves = this.getAllSaves();
        const slot1 = saves.find(s => s.key === this.SAVE_KEY_SLOT1);
        const slot2 = saves.find(s => s.key === this.SAVE_KEY_SLOT2);

        const formatSlot = (slot, key, name) => {
            if (slot) {
                return `
                    <div class="save-slot-card" data-key="${key}">
                        <div class="slot-header">
                            <span class="slot-name">${name}</span>
                            <span class="slot-date">${slot.savedAt ? new Date(slot.savedAt).toLocaleString('es-ES') : 'Sin fecha'}</span>
                        </div>
                        <div class="slot-info">
                            <span>🎮 ${slot.playerName}</span>
                            <span>💰 ${formatCurrency(slot.cash)}</span>
                            <span>📅 Año ${slot.year}, Mes ${slot.month}</span>
                        </div>
                        <button class="btn-save-slot" onclick="PersistenceModule.confirmSaveToSlot('${key}')">💾 Sobrescribir</button>
                    </div>
                `;
            } else {
                return `
                    <div class="save-slot-card empty" data-key="${key}">
                        <div class="slot-header">
                            <span class="slot-name">${name}</span>
                            <span class="slot-empty">Vacío</span>
                        </div>
                        <button class="btn-save-slot" onclick="PersistenceModule.saveAndNotify('${key}')">💾 Guardar Aquí</button>
                    </div>
                `;
            }
        };

        const msg = `
            <style>
                .save-slots-container { padding: 10px 0; }
                .save-slot-card {
                    background: rgba(15, 23, 42, 0.8);
                    border: 1px solid #334155;
                    border-radius: 12px;
                    padding: 15px;
                    margin-bottom: 12px;
                }
                .save-slot-card.empty {
                    border-style: dashed;
                    opacity: 0.7;
                }
                .slot-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                }
                .slot-name {
                    font-weight: 700;
                    color: #38bdf8;
                }
                .slot-date {
                    font-size: 0.8rem;
                    color: #94a3b8;
                }
                .slot-empty {
                    font-size: 0.8rem;
                    color: #64748b;
                    font-style: italic;
                }
                .slot-info {
                    display: flex;
                    gap: 15px;
                    font-size: 0.85rem;
                    color: #e2e8f0;
                    margin-bottom: 12px;
                    flex-wrap: wrap;
                }
                .btn-save-slot {
                    width: 100%;
                    padding: 10px;
                    background: linear-gradient(135deg, #10b981, #059669);
                    border: none;
                    border-radius: 8px;
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.1s;
                }
                .btn-save-slot:hover {
                    transform: scale(1.02);
                }
            </style>
            <div class="save-slots-container">
                ${formatSlot(slot1, this.SAVE_KEY_SLOT1, 'Slot 1')}
                ${formatSlot(slot2, this.SAVE_KEY_SLOT2, 'Slot 2')}
            </div>
        `;

        UI.showModal('💾 Guardar Partida', msg, [
            { text: 'Cerrar', style: 'secondary', fn: null }
        ]);
    },

    confirmSaveToSlot(slotKey) {
        if (confirm('¿Sobrescribir esta partida guardada?')) {
            this.saveAndNotify(slotKey);
        }
    },

    saveAndNotify(slotKey) {
        const result = this.saveToSlot(slotKey);
        document.querySelector('.custom-modal-overlay')?.remove();
        UI.showToast(result.success ? '✅ Guardado' : '❌ Error', result.message, result.success ? 'success' : 'error');
    }
};

/*******************************************************
 * STOCK MARKET
 *******************************************************/
var StockMarket = {
    stocks: [
        { symbol: 'SP500', name: 'S&P 500', price: 4500.00, trend: 0.00, history: [], volatility: 0.08, type: 'index' },
        { symbol: 'NDX', name: 'Nasdaq 100', price: 15500.00, trend: 0.00, history: [], volatility: 0.12, type: 'index' },
        { symbol: 'TEL', name: 'Telefónica', price: 4.00, trend: 0.00, history: [], volatility: 0.10, earnings: 0.35 },
        { symbol: 'SAN', name: 'Santander', price: 3.50, trend: 0.00, history: [], volatility: 0.08, earnings: 0.30 },
        { symbol: 'IBE', name: 'Iberdrola', price: 11.00, trend: 0.00, history: [], volatility: 0.06, earnings: 0.95 },
        { symbol: 'ITX', name: 'Inditex', price: 30.00, trend: 0.00, history: [], volatility: 0.12, earnings: 2.80 },
        { symbol: 'REP', name: 'Repsol', price: 14.00, trend: 0.00, history: [], volatility: 0.15, earnings: 1.40 },
        { symbol: 'HOME', name: 'Home Asia', price: 50.00, trend: 0.00, history: [], volatility: 0.14, earnings: 4.20 },
        { symbol: 'RISU', name: 'La Risu', price: 20.00, trend: 0.00, history: [], volatility: 0.18, earnings: 1.75 },
        { symbol: 'VRDS', name: 'Los Verdes', price: 12.00, trend: 0.00, history: [], volatility: 0.11, earnings: 1.10 }
    ],

    init() {
        // Initialize history for graph
        this.stocks.forEach(s => {
            s.history = [s.price];
            // Add some fake history
            for (let i = 0; i < 10; i++) {
                s.history.unshift(s.price * (1 - (Math.random() * 0.1 - 0.05)));
            }
        });
    },

    getStock(symbol) {
        return this.stocks.find(s => s.symbol === symbol);
    },

    assignAnnualTargets() {
        // Get only non-index stocks (exclude SP500 and NDX)
        const regularStocks = this.stocks.filter(s => !s.type || s.type !== 'index');

        // Shuffle companies randomly
        const shuffled = [...regularStocks].sort(() => Math.random() - 0.5);

        // Assign performance tiers
        // Tier 1: 2 companies with 60-80% annual return
        shuffled[0].annualTarget = 0.60 + Math.random() * 0.20;
        shuffled[1].annualTarget = 0.60 + Math.random() * 0.20;

        // Tier 2: 2 companies with 10-20% annual return
        shuffled[2].annualTarget = 0.10 + Math.random() * 0.10;
        shuffled[3].annualTarget = 0.10 + Math.random() * 0.10;

        // Tier 3: 2 companies with -10% to 1% annual return
        shuffled[4].annualTarget = -0.10 + Math.random() * 0.11;
        shuffled[5].annualTarget = -0.10 + Math.random() * 0.11;

        // Tier 4: 1 company with -20% to -10% annual return
        shuffled[6].annualTarget = -0.20 + Math.random() * 0.10;

        // Tier 5: 1 company with -50% to -30% annual return
        shuffled[7].annualTarget = -0.50 + Math.random() * 0.20;

        // Reset progress tracking for all companies
        regularStocks.forEach(stock => {
            stock.monthsInYear = 0;
            stock.yearStartPrice = stock.price;
        });
    },

    nextTurn() {
        this.stocks.forEach(stock => {
            let totalChange = 0;

            if (stock.type === 'index') {
                // INDEX LOGIC: Mean reversion to +9% annual (~0.72% monthly)
                const targetMonthlyReturn = 0.0072; // ~9% APY
                const fluctuation = (Math.random() * stock.volatility) - (stock.volatility / 2);
                totalChange = targetMonthlyReturn + fluctuation;
            } else {
                // REGULAR STOCK LOGIC WITH ANNUAL TARGETS
                if (!stock.annualTarget) {
                    // Initialize if not set (first time)
                    stock.annualTarget = 0;
                    stock.monthsInYear = 0;
                    stock.yearStartPrice = stock.price;
                }

                // Calculate monthly target to reach annual goal
                const monthlyTarget = stock.annualTarget / 12;

                // Add randomness around the monthly target (±30% of volatility)
                const randomness = (Math.random() * stock.volatility) - (stock.volatility / 2);

                totalChange = monthlyTarget + (randomness * 0.3);

                // Occasional random events (5% chance)
                if (Math.random() < 0.05) {
                    const event = Math.random() < 0.5 ? -0.15 : 0.15;
                    totalChange += event;
                }

                stock.monthsInYear++;
            }

            stock.price = stock.price * (1 + totalChange);
            stock.trend = totalChange;
            if (stock.price < 0.10) stock.price = 0.10;

            // Update History
            stock.history.push(stock.price);
            if (stock.history.length > 20) stock.history.shift();
        });
    },

    buyStock(symbol, qty) {
        const stock = this.getStock(symbol);
        if (!stock) return { success: false, message: 'Acción no encontrada' };

        const cost = stock.price * qty;

        // CALCULATE CURRENT PORTFOLIO VALUE
        let currentPortfolioValue = 0;
        GameState.inventory.stocks.forEach(p => {
            const s = this.getStock(p.symbol);
            if (s) {
                currentPortfolioValue += p.quantity * s.price;
            }
        });

        // CHECK 1,000,000€ PORTFOLIO LIMIT
        const portfolioLimit = 1000000;
        if (currentPortfolioValue >= portfolioLimit) {
            return { success: false, message: `Has alcanzado el límite de cartera (${formatCurrency(portfolioLimit)}). Debes vender acciones antes de comprar más.` };
        }

        if (currentPortfolioValue + cost > portfolioLimit) {
            return { success: false, message: `Esta compra superaría el límite de cartera de ${formatCurrency(portfolioLimit)}. Valor actual: ${formatCurrency(currentPortfolioValue)}.` };
        }

        if (GameState.cash < cost) return { success: false, message: 'Dinero insuficiente' };

        GameState.cash -= cost;
        let pItem = GameState.inventory.stocks.find(s => s.symbol === symbol);
        if (pItem) {
            const totalCost = (pItem.quantity * pItem.avgPrice) + cost;
            pItem.quantity += qty;
            pItem.avgPrice = totalCost / pItem.quantity;
        } else {
            GameState.inventory.stocks.push({ symbol: symbol, name: stock.name, quantity: qty, avgPrice: stock.price });
        }
        return { success: true, message: `Compradas ${qty} acciones de ${symbol} por ${formatCurrency(cost)}` };
    },

    sellStock(symbol, qty) {
        const stock = this.getStock(symbol);
        if (!stock) return { success: false, message: 'Acción no encontrada' };
        let pItem = GameState.inventory.stocks.find(s => s.symbol === symbol);
        if (!pItem || pItem.quantity < qty) return { success: false, message: 'No tienes suficientes acciones' };

        const saleValue = stock.price * qty;
        const purchaseCost = pItem.avgPrice * qty;
        const profit = saleValue - purchaseCost;

        GameState.cash += saleValue;

        // TRACK STOCK GAINS FOR TAXES (only if profit)
        if (profit > 0) {
            if (!GameState.currentYearIncome) {
                GameState.currentYearIncome = { salary: 0, rental: 0, stocks: 0, company: 0 };
            }
            GameState.currentYearIncome.stocks += profit;

            // LIFETIME TRACKING - DEFENSIVE INIT
            if (!GameState.lifetimeStats) {
                GameState.lifetimeStats = {
                    totalIncome: { salary: 0, rental: 0, stocks: 0, company: 0 },
                    totalExpenses: { lifestyle: 0, housing: 0, education: 0 },
                    totalTaxesPaid: 0,
                    realEstate: {
                        totalPurchases: 0,
                        totalSales: 0,
                        propertiesSold: 0
                    }
                };
            }
            GameState.lifetimeStats.totalIncome.stocks += profit;
        }

        pItem.quantity -= qty;
        if (pItem.quantity <= 0) {
            GameState.inventory.stocks = GameState.inventory.stocks.filter(s => s.symbol !== symbol);
        }
        return { success: true, message: `Vendidas ${qty} acciones de ${symbol} por ${formatCurrency(saleValue)}` };
    }
};

var Portfolio = {
    buy(stockSymbol, quantity, gameState) {
        const stock = StockMarket.getStock(stockSymbol);
        const cost = stock.price * quantity;
        const commission = cost * 0.005;
        const totalCost = cost + commission;
        if (gameState.cash >= totalCost) {
            gameState.cash -= totalCost;
            const existing = gameState.inventory.stocks.find(s => s.symbol === stockSymbol);
            if (existing) {
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
            const saleValue = stock.price * quantity;
            const purchaseCost = existing.avgPrice * quantity;
            const profit = saleValue - purchaseCost;
            const commission = saleValue * 0.005;
            const totalReturn = saleValue - commission;

            gameState.cash += totalReturn;

            // TRACK STOCK GAINS FOR TAXES (only if profit, after commission)
            const netProfit = profit - commission;
            if (netProfit > 0) {
                if (!GameState.currentYearIncome) {
                    GameState.currentYearIncome = { salary: 0, rental: 0, stocks: 0, company: 0 };
                }
                GameState.currentYearIncome.stocks += netProfit;

                // LIFETIME TRACKING - DEFENSIVE INIT
                if (!GameState.lifetimeStats) {
                    GameState.lifetimeStats = {
                        totalIncome: { salary: 0, rental: 0, stocks: 0, company: 0 },
                        totalExpenses: { lifestyle: 0, housing: 0, education: 0 },
                        totalTaxesPaid: 0,
                        realEstate: {
                            totalPurchases: 0,
                            totalSales: 0,
                            propertiesSold: 0
                        }
                    };
                }
                GameState.lifetimeStats.totalIncome.stocks += netProfit;
            }

            existing.quantity -= quantity;
            if (existing.quantity === 0) {
                gameState.inventory.stocks = gameState.inventory.stocks.filter(s => s.symbol !== stockSymbol);
            }
            return { success: true, message: `Has vendido ${quantity} acciones de ${stock.name}` };
        }
        return { success: false, message: 'No tienes suficientes acciones' };
    }
};

/*******************************************************
 * BANK
 *******************************************************/
var Bank = {
    INTEREST_RATES: {
        personal: 0.12,
        mortgage: 0.04
    },
    getMaxLoanAmount() {
        // Business Loan Logic
        if (GameState.company) {
            const co = GameState.company;
            const typeConf = CompanyModule.businessTypes[co.typeId];
            const openCost = typeConf.cost;

            let avgRev = co.revenueLastMonth || 0;
            if (co.financialHistory && co.financialHistory.length > 0) {
                const last6 = co.financialHistory.slice(-6);
                const sum = last6.reduce((acc, curr) => acc + curr.revenue, 0);
                avgRev = sum / last6.length;
            }

            const annualRev = avgRev * 12;
            return Math.floor(openCost + (annualRev * 2));
        }

        // Personal Loan Logic
        const netIncome = GameState.salary - GameState.expenses;
        const maxMonthlyPayment = Math.max(0, netIncome) * 0.40;
        const r = this.INTEREST_RATES.personal / 12;
        const n = 60;
        const maxPrincipal = (maxMonthlyPayment * (1 - Math.pow(1 + r, -n))) / r;
        const absoluteCap = Math.max(5000, GameState.netWorth * 2);
        return Math.min(Math.floor(maxPrincipal), absoluteCap);
    },

    createLoan(amount, isBusiness = false) {
        const annualRate = isBusiness ? this.INTEREST_RATES.business : this.INTEREST_RATES.personal;
        const monthlyRate = annualRate / 12;
        const termMonths = 60; // 5 years fixed for personal/business loans
        const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
        const loan = {
            id: Date.now(),
            type: isBusiness ? 'Crédito Empresarial' : 'Préstamo Personal',
            principal: amount,
            termMonths: termMonths,
            remainingMonths: termMonths,
            monthlyPayment: monthlyPayment,
            interestRate: annualRate,
            remainingBalance: amount
        };
        GameState.loans.push(loan);
        GameState.cash += amount;
        return { success: true, message: `Préstamo concedido. Cuota: ${monthlyPayment.toFixed(2)}€/mes` };
    },

    takeLoan(amount, years) {
        if (amount <= 0) return { success: false, message: 'La cantidad debe ser mayor a 0' };

        const max = this.getMaxLoanAmount();
        // Exclude mortgages from personal credit limit check
        const currentDebt = GameState.loans
            .filter(l => !l.type.includes('Hipotecario'))
            .reduce((sum, l) => sum + l.remainingBalance, 0);

        const available = Math.max(0, max - currentDebt);

        if (amount > available) return { success: false, message: `Límite excedido. Te quedan ${formatCurrency(available)} de crédito disponible (Total: ${formatCurrency(max)}).` };

        const isBusiness = !!GameState.company;
        return this.createLoan(amount, isBusiness);
    },

    payLoanPartial(loanId, amount) {
        const loan = GameState.loans.find(l => l.id === loanId);
        if (!loan) return { success: false, message: 'Préstamo no encontrado' };
        if (amount <= 0) return { success: false, message: 'Cantidad inválida' };
        if (GameState.cash < amount) return { success: false, message: 'No tienes suficiente dinero' };
        if (amount > loan.remainingBalance) amount = loan.remainingBalance;

        GameState.cash -= amount;
        loan.remainingBalance -= amount;

        if (loan.remainingBalance < 1) {
            // Fully paid
            const idx = GameState.loans.indexOf(loan);
            GameState.loans.splice(idx, 1);
            return { success: true, message: '¡Préstamo liquidado totalmente!' };
        } else {
            // Recalculate Quota (Reduce Quota, keep term)
            // Formula: P * r / (1 - (1+r)^-n)
            const r = loan.interestRate / 12;
            const n = loan.remainingMonths;
            loan.monthlyPayment = (loan.remainingBalance * r) / (1 - Math.pow(1 + r, -n));

            return { success: true, message: `Amortización realizada. Nueva cuota: ${formatCurrency(loan.monthlyPayment)}/mes` };
        }
    },

    payLoanTotally(loanId) {
        const loanIndex = GameState.loans.findIndex(l => l.id === loanId);
        if (loanIndex === -1) return { success: false, message: 'Préstamo no encontrado' };
        const loan = GameState.loans[loanIndex];
        if (GameState.cash >= loan.remainingBalance) {
            GameState.cash -= loan.remainingBalance;
            GameState.loans.splice(loanIndex, 1);
            return { success: true, message: 'Préstamo liquidado totalmente' };
        }
        return { success: false, message: 'Dinero insuficiente para liquidar' };
    },
    nextTurn() {
        let totalPaid = 0;
        const loansToRemove = [];
        GameState.loans.forEach((loan, index) => {
            if (GameState.cash >= loan.monthlyPayment) {
                GameState.cash -= loan.monthlyPayment;
                totalPaid += loan.monthlyPayment;

                // LIFETIME HOUSING EXPENSE TRACKING (mortgages only)
                if (loan.type && loan.type.includes('Hipotecario')) {
                    if (!GameState.lifetimeStats) {
                        GameState.lifetimeStats = {
                            totalIncome: { salary: 0, rental: 0, stocks: 0, company: 0 },
                            totalExpenses: { lifestyle: 0, housing: 0, education: 0 },
                            totalTaxesPaid: 0,
                            realEstate: {
                                totalPurchases: 0,
                                totalSales: 0,
                                propertiesSold: 0
                            }
                        };
                    }
                    GameState.lifetimeStats.totalExpenses.housing += loan.monthlyPayment;
                }

                const interestPayment = loan.remainingBalance * (loan.interestRate / 12);
                const principalPayment = loan.monthlyPayment - interestPayment;
                loan.remainingBalance -= principalPayment;
                loan.remainingMonths--;
                if (loan.remainingMonths <= 0 || loan.remainingBalance <= 1) {
                    loansToRemove.push(index);
                }
            } else {
                GameState.cash -= loan.monthlyPayment; // Deuda aumenta
            }
        });
        for (let i = loansToRemove.length - 1; i >= 0; i--) {
            GameState.loans.splice(loansToRemove[i], 1);
        }
        return totalPaid;
    }
};

/*******************************************************
 * REAL ESTATE
 *******************************************************/
var RealEstate = {
    availableProperties: [],
    PROPERTY_TYPES: {
        'Residencial': [
            { name: 'Estudio urbano compacto', minM2: 25, maxM2: 35, minPrice: 1500, maxPrice: 3500, icon: '🏢' },
            { name: 'Piso pequeño 1 dormitorio', minM2: 40, maxM2: 55, minPrice: 1500, maxPrice: 3000, icon: '🏢' },
            { name: 'Piso mediano 2-3 dormitorios', minM2: 70, maxM2: 90, minPrice: 1500, maxPrice: 3000, icon: '🏢' },
            { name: 'Piso grande familiar', minM2: 100, maxM2: 130, minPrice: 1400, maxPrice: 2800, icon: '🏢' },
            { name: 'Ático con terraza', minM2: 70, maxM2: 120, minPrice: 2000, maxPrice: 4500, icon: '🏠' }
        ],
        'Turistico': [
            { name: 'Apto. turístico estudio', minM2: 25, maxM2: 35, minPrice: 2000, maxPrice: 5000, icon: '🏖️' },
            { name: 'Apto. turístico 1-2 hab', minM2: 45, maxM2: 70, minPrice: 2000, maxPrice: 5000, icon: '🏖️' },
            { name: 'Edificio aptos. turísticos', minM2: 250, maxM2: 400, minPrice: 1800, maxPrice: 4000, icon: '🏨' },
            { name: 'Coliving optimizado', minM2: 90, maxM2: 140, minPrice: 1600, maxPrice: 3200, icon: '🛏️' },
            { name: 'Hotel urbano pequeño', minM2: 800, maxM2: 1500, minPrice: 1500, maxPrice: 4000, icon: '🏨' }
        ],
        'Garajes': [
            { name: 'Garaje pequeño', minM2: 5, maxM2: 10, minPrice: 800, maxPrice: 2000, icon: '🚗' },
            { name: 'Garaje mediano', minM2: 10, maxM2: 15, minPrice: 800, maxM2: 2000, icon: '🚗' },
            { name: 'Garaje grande', minM2: 15, maxM2: 25, minPrice: 800, maxPrice: 2000, icon: '🚗' },
            { name: 'Trastero pequeño', minM2: 1, maxM2: 3, minPrice: 600, maxPrice: 1800, icon: '📦' },
            { name: 'Box self-storage', minM2: 8, maxM2: 15, minPrice: 700, maxPrice: 2000, icon: '📦' }
        ],
        'Comercial': [
            { name: 'Local comercial pequeño', minM2: 30, maxM2: 60, minPrice: 1000, maxPrice: 4000, icon: '🏪' },
            { name: 'Local comercial mediano', minM2: 80, maxM2: 150, minPrice: 1500, maxPrice: 6000, icon: '🏪' },
            { name: 'Oficina edificio', minM2: 80, maxM2: 200, minPrice: 1500, maxPrice: 4000, icon: '💼' },
            { name: 'Nave industrial pequeña', minM2: 300, maxM2: 600, minPrice: 400, maxPrice: 1200, icon: '🏭' }
        ],
        'Suelo': [
            { name: 'Solar urbano edificable', minM2: 400, maxM2: 800, minPrice: 300, maxPrice: 1500, icon: '🏗️' }
        ],
        'Lujo': [
            { name: 'Piso de Lujo Prime', minM2: 120, maxM2: 200, minPrice: 8000, maxPrice: 15000, icon: '💎' },
            { name: 'Ático Dúplex Lujo', minM2: 150, maxM2: 250, minPrice: 9000, maxPrice: 18000, icon: '💎' },
            { name: 'Villa de Lujo Prime', minM2: 400, maxM2: 800, minPrice: 6000, maxPrice: 12000, icon: '🏰' },
            { name: 'Mansión Súper Lujo', minM2: 800, maxM2: 1500, minPrice: 8000, maxPrice: 20000, icon: '🏰' },
            { name: 'Apto. Lujo Playa', minM2: 120, maxM2: 220, minPrice: 6000, maxPrice: 20000, icon: '🏖️' },
            { name: 'Villa Lujo Mar', minM2: 300, maxM2: 700, minPrice: 8000, maxPrice: 25000, icon: '🏰' },
            { name: 'Piso Ultra High-End', minM2: 200, maxM2: 400, minPrice: 12000, maxM2: 25000, icon: '💎' },
            { name: 'Penthouse Vistas 360', minM2: 250, maxM2: 500, minPrice: 15000, maxPrice: 30000, icon: '💎' },
            { name: 'Casa Histórica Lujo', minM2: 300, maxM2: 700, minPrice: 7000, maxPrice: 18000, icon: '🏛️' },
            { name: 'Residencial Boutique', minM2: 800, maxM2: 2000, minPrice: 7000, maxPrice: 16000, icon: '💎' }
        ]
    },
    availableProperties: [],
    marketTrend: 1.0, // 1.0 = neutral

    createProperty() {
        const categories = Object.keys(this.PROPERTY_TYPES);
        const cat = categories[Math.floor(Math.random() * categories.length)];
        const subTypes = this.PROPERTY_TYPES[cat];
        const typeVar = subTypes[Math.floor(Math.random() * subTypes.length)];

        const sizeM2 = Math.floor(Math.random() * (typeVar.maxM2 - typeVar.minM2) + typeVar.minM2);
        const pricePerM2 = Math.floor(Math.random() * (typeVar.maxPrice - typeVar.minPrice) + typeVar.minPrice);

        const finalPricePerM2 = Math.floor(pricePerM2 * (this.marketTrend || 1));
        const price = sizeM2 * finalPricePerM2;
        const zoneAvgPrice = Math.floor(finalPricePerM2 * (1 + ((Math.random() * 0.2) - 0.1)));

        let baseYield = 0.045;
        if (cat === 'Garajes') baseYield = 0.055;
        if (cat === 'Turistico') baseYield = 0.06;
        if (cat === 'Lujo') baseYield = 0.03;
        if (cat === 'Suelo') baseYield = 0.01;

        const actualYield = baseYield + ((Math.random() * 0.02) - 0.01);
        const monthlyRent = Math.floor((price * actualYield) / 12);

        return {
            id: Date.now() + Math.floor(Math.random() * 100000),
            name: typeVar.name,
            price: isNaN(price) ? 100000 : price,
            monthlyRent: isNaN(monthlyRent) ? 500 : monthlyRent,
            downPaymentPct: 0.20,
            sizeM2: sizeM2,
            pricePerM2: finalPricePerM2,
            zoneAvgPrice: zoneAvgPrice,
            icon: typeVar.icon,
            timestamp: Date.now() // Track age
        };
    },

    generateListings() {
        this.availableProperties = [];
        for (let i = 0; i < 6; i++) {
            this.availableProperties.push(this.createProperty());
        }
    },

    nextTurn() {
        // 1. Cycle Market: Remove oldest available, add new one
        if (this.availableProperties.length > 0) {
            // Assuming index 0 is oldest due to push order
            this.availableProperties.shift();
        }
        if (this.availableProperties.length < 6) {
            this.availableProperties.push(this.createProperty());
        }

        // 2. Price Evolution
        const change = (Math.random() * 0.06) - 0.025;
        this.marketTrend *= (1 + change);
        GameState.inventory.realEstate.forEach(prop => {
            const localChange = (Math.random() * 0.04) - 0.02;
            const totalChange = change + localChange;
            prop.price = Math.floor(prop.price * (1 + totalChange));
        });
    },

    buyProperty(propertyId, useMortgage = true, termYears = 30) {
        const propertyIndex = this.availableProperties.findIndex(p => p.id === propertyId);
        if (propertyIndex === -1) return { success: false, message: 'Propiedad no encontrada' };
        const property = this.availableProperties[propertyIndex];
        const downPayment = useMortgage ? property.price * property.downPaymentPct : property.price;
        const loanAmount = property.price - downPayment;

        if (GameState.cash < downPayment) {
            return { success: false, message: 'Necesitas más dinero para la entrada' };
        }

        if (useMortgage && loanAmount > 0) {
            const r = Bank.INTEREST_RATES.mortgage / 12;
            const n = termYears * 12;
            const monthlyPayment = (loanAmount * r) / (1 - Math.pow(1 + r, -n));
            const mortgageId = Date.now();

            GameState.loans.push({
                id: mortgageId,
                type: `Hipotecario (${termYears} años)`,
                principal: loanAmount,
                termMonths: n,
                remainingMonths: n,
                monthlyPayment: monthlyPayment,
                interestRate: Bank.INTEREST_RATES.mortgage,
                remainingBalance: loanAmount
            });

            property.mortgageId = mortgageId;
        }

        GameState.cash -= downPayment;
        property.purchasePrice = property.price;
        GameState.inventory.realEstate.push(property);
        this.availableProperties.splice(propertyIndex, 1);
        return { success: true, message: `¡Has comprado: ${property.name}!` };
    },

    sellProperty(propertyId) {
        const propIndex = GameState.inventory.realEstate.findIndex(p => p.id === propertyId);
        if (propIndex === -1) return { success: false, message: 'No posees esta propiedad.' };

        const property = GameState.inventory.realEstate[propIndex];
        const marketValue = property.price;
        const purchasePrice = property.purchasePrice || property.price; // Fallback if not set

        let mortgageCost = 0;
        if (property.mortgageId) {
            const loanIndex = GameState.loans.findIndex(l => l.id === property.mortgageId);
            if (loanIndex !== -1) {
                mortgageCost = GameState.loans[loanIndex].remainingBalance;
                GameState.loans.splice(loanIndex, 1);
            }
        }

        const netProfit = marketValue - mortgageCost;
        const actualProfit = marketValue - purchasePrice; // True profit (sale - purchase)

        GameState.cash += netProfit;

        // LIFETIME REAL ESTATE TRACKING
        if (!GameState.lifetimeStats) {
            GameState.lifetimeStats = {
                totalIncome: { salary: 0, rental: 0, stocks: 0, company: 0 },
                totalExpenses: { lifestyle: 0, housing: 0, education: 0 },
                totalTaxesPaid: 0,
                realEstate: {
                    totalPurchases: 0,
                    totalSales: 0,
                    propertiesSold: 0
                }
            };
        }
        if (!GameState.lifetimeStats.realEstate) {
            GameState.lifetimeStats.realEstate = {
                totalPurchases: 0,
                totalSales: 0,
                propertiesSold: 0
            };
        }
        GameState.lifetimeStats.realEstate.totalPurchases += purchasePrice;
        GameState.lifetimeStats.realEstate.totalSales += marketValue;
        GameState.lifetimeStats.realEstate.propertiesSold += 1;

        GameState.inventory.realEstate.splice(propIndex, 1);
        return { success: true, message: `Propiedad vendida por ${formatCurrency(marketValue)}. Hipoteca cancelada: ${formatCurrency(mortgageCost)}. Neto: ${formatCurrency(netProfit)}` };
    }
};
RealEstate.generateListings();

/*******************************************************
 * EDUCATION SYSTEM
 *******************************************************/
var LifestyleModule = {
    categories: {
        housing: {
            label: 'Vivienda',
            items: [
                { id: 'parents', name: 'Casa de los Padres', cost: 0, deposit: 0, desc: 'Ahorro máximo. Cero privacidad.' },
                { id: 'sofa', name: 'Sofá de un amigo', cost: 150, deposit: 0, desc: 'Temporal e incómodo. Mejor que la calle.' },
                { id: 'pension', name: 'Pensión Mala Muerte', cost: 200, deposit: 400, desc: 'Ruidoso y sucio.' },
                { id: 'room_cheap', name: 'Habitación Interior', cost: 250, deposit: 1000, desc: 'Sin ventanas, solo para dormir.' },
                { id: 'room', name: 'Habitación Compartida', cost: 300, deposit: 1200, desc: 'El estándar de estudiante.' },
                { id: 'room_suit', name: 'Habitación con Baño', cost: 450, deposit: 1800, desc: 'Un poco más de dignidad.' },
                { id: 'basement', name: 'Sótano / Loft', cost: 600, deposit: 2400, desc: 'Espacioso pero oscuro.' },
                { id: 'studio', name: 'Estudio Privado', cost: 900, deposit: 3600, desc: 'Tu propio espacio. Pequeño.' },
                { id: 'apt_out', name: 'Piso en las Afueras', cost: 1100, deposit: 4400, desc: 'Grande pero lejos.' },
                { id: 'apartment', name: 'Apartamento Céntrico', cost: 1500, deposit: 6000, desc: 'Buena zona, 2 habitaciones.' },
                { id: 'loft', name: 'Loft de Diseño', cost: 2500, deposit: 10000, desc: 'Techos altos, ladrillo visto.' },
                { id: 'penthouse', name: 'Ático de Lujo', cost: 5000, deposit: 20000, desc: 'Mejores vistas de la ciudad.' },
                { id: 'mansion', name: 'Mansión Privada', cost: 15000, deposit: 60000, desc: 'Seguridad privada, piscina, todo.' }
            ]
        },
        food: {
            label: 'Alimentación',
            items: [
                { id: 'scraps', name: 'Comida de la Mamá', cost: 0, desc: 'Tuppers y cariño. Supervivencia.' },
                { id: 'noodles', name: 'Ramen Instantáneo', cost: 100, desc: 'Mucha sal, poco precio.' },
                { id: 'junk', name: 'Comida Rápida / Básica', cost: 200, desc: 'Grasientiento pero barato.' },
                { id: 'cooking_basic', name: 'Cocina Simple', cost: 250, desc: 'Ingredientes marca blanca.' },
                { id: 'cooking', name: 'Cocina Variada', cost: 300, desc: 'Carne, pescado y verduras.' },
                { id: 'menu', name: 'Menú del Día', cost: 450, desc: 'Comer fuera a diario (barato).' },
                { id: 'bio', name: 'Supermercado Bio', cost: 600, desc: 'Todo orgánico y caro.' },
                { id: 'delivery', name: 'Delivery Diario', cost: 900, desc: 'Glovo/Uber Eats para todo.' },
                { id: 'rest_nice', name: 'Restaurantes Buenos', cost: 1500, desc: 'Sitios de moda y calidad.' },
                { id: 'chef', name: 'Chef Privado', cost: 3000, desc: 'Te cocinan en casa.' },
                { id: 'michelin', name: 'Ruta Michelin', cost: 10000, desc: 'Solo lo mejor del mundo.' }
            ]
        },
        transport: {
            label: 'Transporte',
            items: [
                { id: 'walk', name: 'Andando', cost: 0, purchaseCost: 0, desc: 'Gratis. Cansa y tarda.' },
                { id: 'skate', name: 'Skate / Patines', cost: 0, purchaseCost: 100, desc: 'Rápido en distancias cortas.' },
                { id: 'bike', name: 'Bicicleta', cost: 10, purchaseCost: 150, desc: 'Sano y ecológico.' },
                { id: 'scooter_el', name: 'Patinete Eléctrico', cost: 20, purchaseCost: 400, desc: 'El rey de la ciudad.' },
                { id: 'public', name: 'Transporte Público', cost: 50, purchaseCost: 0, desc: 'Metro y Bus. Fiable.' },
                { id: 'moto_125', name: 'Moto 125cc', cost: 100, purchaseCost: 2500, desc: 'Aparcas donde quieres.' },
                { id: 'moto_big', name: 'Moto Gran Cilindrada', cost: 200, purchaseCost: 9000, desc: 'Potencia y ruido.' },
                { id: 'car_old', name: 'Coche 2ª Mano', cost: 250, purchaseCost: 8000, desc: 'Te lleva y te trae.' },
                { id: 'car_new', name: 'Coche Nuevo', cost: 400, purchaseCost: 22000, desc: 'Olor a nuevo, sin problemas.' },
                { id: 'car_premium', name: 'Berlina Premium', cost: 600, purchaseCost: 50000, desc: 'Comodidad alemana.' },
                { id: 'car_sport', name: 'Deportivo', cost: 1000, purchaseCost: 90000, desc: 'Miradas en cada semáforo.' },
                { id: 'supercar', name: 'Superdeportivo', cost: 3000, purchaseCost: 250000, desc: 'Una bestia italiana.' },
                { id: 'chofer', name: 'Chófer Privado', cost: 5000, purchaseCost: 0, desc: 'No conduces nunca más.' }
            ]
        },
        leisure: {
            label: 'Ocio',
            items: [
                { id: 'free', name: 'Parque y Sol', cost: 0, desc: 'Aire libre y gratis.' },
                { id: 'library', name: 'Libros y Biblioteca', cost: 20, desc: 'Cultura barata.' },
                { id: 'internet', name: 'Internet y Juegos', cost: 50, desc: 'Ocio digital casero.' },
                { id: 'basic', name: 'Ocio Básico', cost: 100, desc: 'Netflix y alguna caña.' },
                { id: 'hobbies', name: 'Hobbies Caseros', cost: 200, desc: 'Maquetas, pintura, cursos.' },
                { id: 'active', name: 'Vida Activa', cost: 300, desc: 'Gimnasio, cine y cenas.' },
                { id: 'clubbing', name: 'Fiesta y Copas', cost: 500, desc: 'Cerrar discotecas.' },
                { id: 'weekend', name: 'Escapadas Fin de Semana', cost: 800, desc: 'Turismo nacional frecuente.' },
                { id: 'vip', name: 'Reservados VIP', cost: 1500, desc: 'Botellas y zonas exclusivas.' },
                { id: 'travel', name: 'Viajes Internacionales', cost: 3000, desc: 'Japón, NY, Maldivas.' },
                { id: 'exclusive', name: 'Clubes Privados', cost: 6000, desc: 'Networking de alto nivel.' },
                { id: 'yacht', name: 'Fiestas en Yate', cost: 15000, desc: 'El Lobo de Wall Street.' }
            ]
        },
        clothes: {
            label: 'Ropa',
            items: [
                { id: 'donations', name: 'Ropa Donada', cost: 0, desc: 'Lo que te dan.' },
                { id: 'second_hand', name: 'Segunda Mano', cost: 30, desc: 'Wallapop y Humana.' },
                { id: 'low_cost', name: 'Mercadillo', cost: 60, desc: 'Barato y funcional.' },
                { id: 'basic', name: 'Moda Básica', cost: 100, desc: 'Basicos sin marca.' },
                { id: 'fast_fashion', name: 'Fast Fashion', cost: 200, desc: 'Zara, Mango, H&M.' },
                { id: 'sport', name: 'Marcas Deportivas', cost: 300, desc: 'Nike, Adidas. Comodidad.' },
                { id: 'boutique', name: 'Boutique Local', cost: 500, desc: 'Ropa con personalidad.' },
                { id: 'tech', name: 'Techwear / Gadgets', cost: 800, desc: 'Estilo funcional caro.' },
                { id: 'suits', name: 'Trajes a Medida', cost: 1500, desc: 'Sastrería clásica.' },
                { id: 'designer', name: 'Firmas de Lujo', cost: 3000, desc: 'Gucci, Prada, LV.' },
                { id: 'collector', name: 'Coleccionista', cost: 10000, desc: 'Piezas únicas de pasarela.' }
            ]
        }
    },

    calculateTotal() {
        let total = 0;
        const s = GameState.lifestyle;
        if (!s) return 750;

        Object.keys(this.categories).forEach(catKey => {
            const itemId = s[catKey];
            const item = this.categories[catKey].items.find(i => i.id === itemId);
            if (item) total += item.cost;
        });
        return total;
    },

    getItem(category, id) {
        return this.categories[category].items.find(i => i.id === id);
    },

    setOption(category, id) {
        if (!GameState.lifestyle) return { success: false };

        // Check if already selected
        if (GameState.lifestyle[category] === id) return { success: false, message: 'Ya tienes este nivel.' };

        const item = this.getItem(category, id);
        if (!item) return { success: false, message: 'Opción inválida.' };

        // UPFRONT COST LOGIC
        let upfront = 0;
        if (item.deposit) upfront += item.deposit;
        if (item.purchaseCost) upfront += item.purchaseCost;

        if (GameState.cash < upfront) {
            return { success: false, message: `Fondos insuficientes. Necesitas ${formatCurrency(upfront)} para el pago inicial (Fianza/Compra).` };
        }

        // DEDUCT & SET
        GameState.cash -= upfront;
        GameState.lifestyle[category] = id;
        GameState.expenses = this.calculateTotal();

        return { success: true, message: `¡Actualizado! Pagados ${formatCurrency(upfront)} iniciales.` };
    }
};
var EducationModule = {
    courses: [
        { id: 'bachillerato', name: 'Bachillerato', cost: 0, duration: 18, salaryMod: 1.0, required: null, desc: 'Formación académica base. Necesaria para la Universidad.' },
        { id: 'fp_medio', name: 'FP Grado Medio', cost: 500, duration: 18, salaryMod: 1.2, required: null, desc: 'Formación Profesional práctica. Acceso a FP Superior.' },

        // FP Superior
        { id: 'fp_admin', name: 'FP Sup. Administración', cost: 1500, duration: 24, salaryMod: 1.5, required: ['bachillerato', 'fp_medio'], desc: 'Gestión y Finanzas.' },
        { id: 'fp_dam', name: 'FP Sup. Desarrollo Apps', cost: 1500, duration: 24, salaryMod: 1.6, required: ['bachillerato', 'fp_medio'], desc: 'Programación y Software.' },
        { id: 'fp_maint', name: 'FP Sup. Mantenimiento', cost: 1500, duration: 24, salaryMod: 1.5, required: ['bachillerato', 'fp_medio'], desc: 'Instalaciones y Montaje.' },

        // Grados
        { id: 'grado_ade', name: 'Grado en ADE', cost: 6000, duration: 48, salaryMod: 2.0, required: ['bachillerato'], desc: 'Administración de Empresas.' },
        { id: 'grado_cs', name: 'Grado en Ing. Informática', cost: 6000, duration: 48, salaryMod: 2.2, required: ['bachillerato'], desc: 'Ciencias de la Computación.' },
        { id: 'grado_civil', name: 'Grado en Ing. Civil', cost: 6000, duration: 48, salaryMod: 2.1, required: ['bachillerato'], desc: 'Obras y Construcción.' },

        // Masters
        { id: 'master_fin', name: 'Máster en Finanzas', cost: 12000, duration: 12, salaryMod: 3.5, required: ['grado_ade'], desc: 'Dirección Financiera.' },
        { id: 'master_ai', name: 'Máster en IA', cost: 12000, duration: 12, salaryMod: 4.0, required: ['grado_cs'], desc: 'Inteligencia Artificial.' },
        { id: 'master_ing', name: 'Máster Ingeniería', cost: 12000, duration: 12, salaryMod: 3.5, required: ['grado_civil'], desc: 'Habilitante para firma de proyectos.' },

        { id: 'bootcamp', name: 'Bootcamp Programación', cost: 4000, duration: 6, salaryMod: 2.5, required: null, desc: 'Intensivo tech. Alta demanda.' }
    ],

    getCourse(id) {
        return this.courses.find(c => c.id === id);
    },

    startCourse(courseId) {
        if (GameState.currentCourse) return { success: false, message: 'Ya estás estudiando.' };
        const course = this.courses.find(c => c.id === courseId);
        const cost = course.cost; // Changed from costYear to cost
        if (GameState.cash < cost) return { success: false, message: 'No tienes dinero suficiente para la matrícula.' };

        // Strict Requirement Check
        if (course.required) {
            const hasReq = course.required.some(req => GameState.education.includes(req));
            if (!hasReq) return { success: false, message: `Requisito no cumplido: Necesitas ${course.required.join(' o ')}.` };
        }

        GameState.cash -= cost;

        // LIFETIME EDUCATION EXPENSE TRACKING
        if (!GameState.lifetimeStats) {
            GameState.lifetimeStats = {
                totalIncome: { salary: 0, rental: 0, stocks: 0, company: 0 },
                totalExpenses: { lifestyle: 0, housing: 0, education: 0 },
                totalTaxesPaid: 0,
                realEstate: {
                    totalPurchases: 0,
                    totalSales: 0,
                    propertiesSold: 0
                }
            };
        }
        GameState.lifetimeStats.totalExpenses.education += cost;

        GameState.isStudying = true;
        GameState.currentCourse = {
            ...course,
            remainingMonths: course.duration
        };

        return { success: true, message: `Has empezado: ${course.name}` };
    },

    nextTurn() {
        if (GameState.isStudying) {
            GameState.currentCourse.remainingMonths--;
            if (GameState.currentCourse.remainingMonths <= 0) {
                this.completeCourse();
            }
        }
    },

    completeCourse() {
        const course = GameState.currentCourse;
        if (!GameState.education.includes(course.id)) {
            GameState.education.push(course.id);
        }
        GameState.isStudying = false;
        GameState.currentCourse = null;

        let message = `
                    <style>
                        /* HACK: Tighten spacing for Course Completion modal */
                        .custom-modal-box h3 { margin-bottom: 5px !important; padding-bottom: 0 !important; }
                        .custom-modal-box .modal-body { padding-top: 5px !important; }
                    </style>
                    <div style="text-align:center;">
                        <h3 style="color:#facc15; margin:0 0 10px 0;">¡Felicidades!</h3>
                        <p style="margin-bottom:15px;">Has completado: <strong>${course.name}</strong></p>
                        <p style="font-size:0.9rem; color:#cbd5e1;">Ahora puedes acceder a puestos de mayor cualificación.</p>
                    </div>
                `;

        UI.showModal('¡Curso Finalizado!', message, [
            {
                text: 'Ir a Trabajo', style: 'success', fn: () => {
                    // Switch to Job View
                    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
                    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                    document.getElementById('job-view').classList.add('active');
                    const jobBtn = document.querySelector(`button[data-view="job"]`);
                    if (jobBtn) jobBtn.classList.add('active');

                    // Also sync bottom nav if exists (mobile)
                    document.querySelectorAll('.b-nav-item').forEach(b => {
                        b.classList.remove('active');
                        if (b.dataset.view === 'job') b.classList.add('active');
                    });

                    UI.updateJob(JobSystem);
                    window.scrollTo(0, 0);
                }
            }
        ]);

        UI.updateEducation(this);
        UI.updateJob(JobSystem);
    }
};

/*******************************************************
 * COMPANY MODULE (Entrepreneurship Mode "Big Ambitions")
 *******************************************************/
var CompanyModule = {
    // Configuration
    businessTypes: {
        'cafe': { name: 'Cafetería', cost: 15000, baseDemand: 800, baseTicket: 5, cogsPct: 0.25, productivityPerStaff: 800, volatility: 0.05, tier: 1, baseWage: 1200, icon: '☕', baseRent: 1500 },
        'retail_clothing': { name: 'Tienda de Ropa', cost: 50000, baseDemand: 100, baseTicket: 55, cogsPct: 0.4, productivityPerStaff: 120, volatility: 0.2, tier: 1, baseWage: 1200, icon: '👗', baseRent: 2500 },
        'marketing_agency': { name: 'Agencia Marketing', cost: 250000, baseDemand: 8, baseTicket: 2000, cogsPct: 0.1, productivityPerStaff: 4, volatility: 0.3, tier: 1, baseWage: 2800, icon: '📈', baseRent: 4000 },
        'tech_startup': { name: 'Startup SaaS', cost: 750000, baseDemand: 100, baseTicket: 100, cogsPct: 0.05, productivityPerStaff: 200, volatility: 0.6, tier: 2, baseWage: 3000, icon: '💻', baseRent: 2000 }
    },
    locations: {
        'suburbs': { name: 'Afueras', rentMult: 0.5, trafficMult: 0.8 },
        'downtown': { name: 'Centro Ciudad', rentMult: 1.5, trafficMult: 1.0 },
        'business_district': { name: 'Distrito Financiero', rentMult: 3.0, trafficMult: 1.2 }
    },
    providers: {
        'cheap': { name: 'Mayorista Low-Cost', priceMod: 0.8, quality: 0.4, reliability: 0.7 },
        'standard': { name: 'Distribuidor Estándar', priceMod: 1.0, quality: 0.7, reliability: 0.9 },
        'premium': { name: 'Importador Premium', priceMod: 1.4, quality: 1.0, reliability: 0.99 }
    },
    marketingChannels: {
        'none': { name: 'Sin Publicidad', cost: 0, impact: 1.0 },
        'social': { name: 'Redes Sociales', cost: 500, impact: 1.3 },
        'local': { name: 'Radio/Prensa Local', cost: 1500, impact: 1.6 },
        'influencers': { name: 'Campaña Influencers', cost: 5000, impact: 2.2 }
    },

    // Logic
    createCompany(name, typeKey, locKey) {
        const type = this.businessTypes[typeKey];
        const loc = this.locations[locKey];
        if (!type || !loc) return { success: false, message: 'Configuración inválida.' };
        if (GameState.cash < type.cost) return { success: false, message: `Necesitas ${formatCurrency(type.cost)}.` };

        GameState.cash -= type.cost;

        GameState.company = {
            name: name,
            typeId: typeKey,
            typeName: type.name,
            locationId: locKey,
            locationName: loc.name,

            // Financials
            cash: 5000,
            revenueLastMonth: 0,
            expensesLastMonth: 0,
            profitLastMonth: 0,

            // Analytics
            revenueHistory: [],
            profitHistory: [],

            // State
            reputation: 3.0,
            customerSatisfaction: 0.7,

            // Assets / Levels
            marketingLevel: 1,
            productLevel: 1,
            maxStaff: 5, // TIER 1 CAP

            // Decisions
            marketingChannel: 'none',
            providerId: 'standard',
            staff: [],

            events: [],
            age: 0
        };

        GameState.jobTitle = `CEO de ${name}`;
        GameState.salary = 0;
        JobSystem.currentCareerPath = 'entrepreneur';

        return { success: true, message: `Has fundado ${name}.` };
    },

    hireStaff(role, salary, skill) {
        if (!GameState.company) return;
        const co = GameState.company;

        if (co.staff.length >= co.maxStaff) {
            return { success: false, message: `Límite de personal alcanzado (${co.maxStaff}). Mejora tu oficina.` };
        }

        co.staff.push({
            role: role,
            salary: salary,
            startWage: salary,
            skill: skill || 0.5,
            morale: 0.8
        });
        return { success: true, message: `Contratado: ${role}` };
    },

    fireStaff(index) {
        if (!GameState.company) return;
        GameState.company.staff.splice(index, 1);
        GameState.company.staff.forEach(s => s.morale = Math.max(0, s.morale - 0.1));
        return { success: true, message: 'Empleado despedido.' };
    },

    upgradeOffice() {
        if (!GameState.company) return;
        const co = GameState.company;

        let nextLimit = 0;
        let costMultiplier = 0;

        if (co.maxStaff === 5) { nextLimit = 10; costMultiplier = 3; }
        else if (co.maxStaff === 10) { nextLimit = 15; costMultiplier = 3; }
        else return { success: false, message: 'Ya tienes la oficina máxima.' };

        const baseCost = nextLimit === 10 ? 15000 : 30000;
        const profitCalc = Math.max(0, co.profitLastMonth) * costMultiplier;
        const finalCost = Math.max(baseCost, profitCalc);

        if (co.cash < finalCost) return { success: false, message: `Faltan fondos. Coste: ${formatCurrency(finalCost)}` };

        co.cash -= finalCost;
        co.maxStaff = nextLimit;

        return { success: true, message: `¡Oficina ampliada! Nuevo límite: ${nextLimit} empleados.` };
    },

    hireManager() {
        if (!GameState.company) return;
        const co = GameState.company;

        if (co.staff.length < 15 || co.maxStaff < 15) return { success: false, message: 'Necesitas una empresa completa (15 empleados).' };

        const cost = Math.max(30000, co.profitLastMonth * 3);
        if (co.cash < cost) return { success: false, message: `Necesitas ${formatCurrency(cost)} para contratar al Gerente y automatizar.` };

        co.cash -= cost;

        if (!GameState.ownedCompanies) GameState.ownedCompanies = [];

        const history = co.financialHistory || [];
        const last3 = history.slice(-3);
        let totalProfit = 0;
        last3.forEach(h => totalProfit += h.profit);

        let baseline = 0;
        if (last3.length > 0) {
            baseline = totalProfit / last3.length;
        } else {
            baseline = (co.profitLastMonth || 0) * 0.9;
        }

        co.baselineProfit = Math.max(baseline, 500);
        co.events.push(`👔 Gerente contratado. Ingreso Base fijado en: ${formatCurrency(co.baselineProfit)}`);

        GameState.ownedCompanies.push(co);

        GameState.company = null;
        GameState.jobTitle = 'Magnate (Sin empresa activa)';
        JobSystem.currentCareerPath = 'none';

        return { success: true, message: `¡${co.name} automatizada! Beneficio Base: ${formatCurrency(co.baselineProfit)}/mes.` };
    },

    setStrategicOption(category, value) {
        if (!GameState.company) return;
        if (category === 'marketing') GameState.company.marketingChannel = value;
        if (category === 'provider') GameState.company.providerId = value;
    },

    invest(type) {
        if (!GameState.company) return;
        const co = GameState.company;

        let currentLevel = 1;
        let name = '';

        if (type === 'product_dev') { currentLevel = co.productLevel; name = "Desarrollo Producto"; }
        if (type === 'marketing_infra') { currentLevel = co.marketingLevel; name = "Infraestructura Mkt"; }

        if (currentLevel >= co.staff.length) {
            return { success: false, message: `Límite alcanzado: Necesitas más empleados (${co.staff.length}) para mejorar esto.` };
        }

        const cost = 5000 * currentLevel;

        if (co.cash < cost) return { success: false, message: `Necesitas ${formatCurrency(cost)} para mejorar ${name}.` };

        co.cash -= cost;

        if (type === 'product_dev') co.productLevel++;
        if (type === 'marketing_infra') co.marketingLevel++;

        return { success: true, message: `¡Mejora completada! ${name} ahora es Nivel ${currentLevel + 1}` };
    },

    sellPassiveCompany(index) {
        const co = GameState.ownedCompanies[index];
        if (!co) return;

        const valuation = Math.floor(co.baselineProfit * 12 * 5);

        if (confirm(`¿Vender ${co.name} por ${formatCurrency(valuation)}? (5x Beneficio Anual)`)) {
            GameState.cash += valuation;
            GameState.ownedCompanies.splice(index, 1);
            alert(`Has vendido ${co.name}. ${formatCurrency(valuation)} transferidos a tu cuenta personal.`);
            UI.updateJob(JobSystem);
        }
    },

    nextTurn() {
        if (GameState.company) {
            this.processCompany(GameState.company, true);
        }

        if (GameState.ownedCompanies && GameState.ownedCompanies.length > 0) {
            GameState.ownedCompanies.forEach(co => {
                this.processCompany(co, false);
                if (co.profitLastMonth > 0) {
                    GameState.cash += co.profitLastMonth;

                    // TRACK COMPANY PROFITS FOR TAXES
                    if (!GameState.currentYearIncome) {
                        GameState.currentYearIncome = { salary: 0, rental: 0, stocks: 0, company: 0 };
                    }
                    GameState.currentYearIncome.company += co.profitLastMonth;
                    // LIFETIME TRACKING
                    GameState.lifetimeStats.totalIncome.company += co.profitLastMonth;
                }
            });
        }
    },

    processCompany(co, isActive) {
        const type = this.businessTypes[co.typeId];

        // --- PASSIVE LOGIC (Manager) ---
        if (!isActive) {
            let volatPct = 0.10;
            if (co.typeId === 'retail') volatPct = 0.25;
            if (co.typeId === 'tech') volatPct = 0.50;

            const variation = (Math.random() * (volatPct * 2)) - volatPct;

            const base = co.baselineProfit || 1000;
            const monthlyProfit = Math.floor(base * (1 + variation));

            co.profitLastMonth = monthlyProfit;
            co.financialHistory = co.financialHistory || [];

            co.financialHistory.push({
                month: GameState.month,
                revenue: monthlyProfit * 1.5,
                profit: monthlyProfit,
                expenses: { total: monthlyProfit * 0.5, wages: 0, rent: 0, cogs: 0, marketing: 0, opex: 0, salary: 0 }
            });

            return { profit: monthlyProfit };
        }

        // --- ACTIVE LOGIC ---
        const loc = this.locations[co.locationId];
        const marketing = this.marketingChannels[co.marketingChannel];
        const provider = this.providers[co.providerId];

        co.age++;
        co.events = [];

        let totalProductivity = 1.0;
        let wageBill = 0;

        co.staff.forEach(emp => {
            if (emp.skill < 1.0) {
                const growth = ((Math.random() * 0.04) + 0.01) / 2;
                emp.skill = Math.min(1.0, emp.skill + growth);
            } else {
                // Expert endgame growth bonus
                const growthRate = (emp.role === 'Experto') ? 0.006 : 0.005;
                emp.skill += growthRate;
            }

            if (!emp.startWage) emp.startWage = emp.salary;

            const calculationSkill = Math.min(1.0, emp.skill);
            const wageSteps = Math.floor((calculationSkill - 0.5) / 0.1);
            const increasePct = wageSteps * 0.10;
            emp.requiredWage = Math.floor(emp.startWage * (1 + increasePct));

            if (emp.autoWage) {
                emp.salary = emp.requiredWage;
            }

            if (emp.salary >= emp.requiredWage) {
                emp.morale = Math.min(1.0, emp.morale + 0.05);
            } else {
                emp.morale = Math.max(0.0, emp.morale - 0.10);
                co.events.push(`⚠️ Empleado descontento: Exige ${formatCurrency(emp.requiredWage)}`);
            }

            const contribution = emp.skill * emp.morale;
            totalProductivity += (contribution);
            wageBill += emp.salary;
        });

        if (!co.organicDemandMult) co.organicDemandMult = 1.0;

        let growthRate = 0;
        if (co.reputation >= 2.5) {
            growthRate = ((co.reputation - 2.5) / 2.5) * 0.05;
        } else {
            growthRate = ((co.reputation - 2.5) / 2.5) * 0.03;
        }

        co.organicDemandMult *= (1 + growthRate);
        co.organicDemandMult = Math.max(0.1, co.organicDemandMult);

        const marketingEffectiveness = marketing.impact * (1 + (co.marketingLevel * 0.2));
        let demand = (type.baseDemand) * loc.trafficMult * marketingEffectiveness;

        demand *= (0.5 + (co.reputation / 5));
        demand *= co.organicDemandMult;

        const volatility = type.volatility;
        const fluctuation = 1 + ((Math.random() * volatility * 2) - volatility);
        demand *= fluctuation;

        const capacity = Math.floor(totalProductivity * type.productivityPerStaff);
        const actualCustomers = Math.min(demand, capacity);

        if (demand > capacity && co.staff.length < 15) {
            co.events.push(`⚠️ Necesitas más empleados.`);
        }

        const baseTicket = type.baseTicket;
        const sellingPrice = co.customPrice || baseTicket;
        const avgTicket = sellingPrice;

        const revenue = actualCustomers * avgTicket;

        let cogs = revenue * type.cogsPct * provider.priceMod;
        const opEx = (co.marketingLevel * 100) + (co.productLevel * 150);
        const rent = 1500 * loc.rentMult;
        const marketingCost = marketing.cost;

        let ceoSalary = co.ceoSalary || 0;
        if (isActive) GameState.salary = ceoSalary;

        if (co.cash < ceoSalary) {
            ceoSalary = co.cash; // Can't pay what you don't have
            if (isActive) GameState.salary = ceoSalary;
        }

        // Do NOT add to GameState.cash here. The main loop does it via GameState.salary.
        // Just deduct from company.

        const totalExpenses = wageBill + rent + cogs + marketingCost + opEx + ceoSalary;
        const profit = revenue - totalExpenses;

        co.cash += profit;

        co.revenueLastMonth = Math.floor(revenue);
        co.expensesLastMonth = Math.floor(totalExpenses);
        co.profitLastMonth = Math.floor(profit);

        const unitCost = avgTicket * type.cogsPct * provider.priceMod;
        const prevDemand = co.lastStats ? co.lastStats.demand : 0;
        let growthPct = 0;

        if (prevDemand > 0) {
            growthPct = ((Math.floor(demand) - prevDemand) / prevDemand);
        }

        co.lastStats = {
            ticket: avgTicket,
            unitCost: unitCost,
            unitMargin: avgTicket - unitCost,
            demand: Math.floor(demand),
            demandGrowth: growthPct,
            capacity: Math.floor(capacity),
            customers: Math.floor(actualCustomers),
            productivityPerStaff: type.productivityPerStaff,
            totalProductivity: totalProductivity,
            demandComposition: {
                base: type.baseDemand,
                traffic: loc.trafficMult,
                marketing: marketingEffectiveness,
                reputation: (0.5 + (co.reputation / 5)),
                organic: co.organicDemandMult,
                volatility: fluctuation
            }
        };

        const historyEntry = {
            month: co.age,
            revenue: co.revenueLastMonth,
            profit: co.profitLastMonth,
            expenses: {
                wages: Math.floor(wageBill),
                rent: Math.floor(rent),
                cogs: Math.floor(cogs),
                marketing: Math.floor(marketingCost),
                opex: Math.floor(opEx),
                salary: Math.floor(ceoSalary),
                total: co.expensesLastMonth
            }
        };

        if (!co.financialHistory) co.financialHistory = [];
        co.financialHistory.push(historyEntry);
        if (co.financialHistory.length > 24) co.financialHistory.shift();

        if (!co.revenueHistory) co.revenueHistory = [];
        if (!co.profitHistory) co.profitHistory = [];
        co.revenueHistory.push(co.revenueLastMonth);
        co.profitHistory.push(co.profitLastMonth);
        if (co.revenueHistory.length > 24) co.revenueHistory.shift();
        if (co.profitHistory.length > 24) co.profitHistory.shift();

        const actualQuality = provider.quality + ((co.productLevel - 1) * 0.05);
        const priceRatio = (avgTicket / baseTicket) || 1;
        const priceChangePct = priceRatio - 1;
        const requiredQuality = 0.70 + (priceChangePct * 2.0);

        const qualityGap = actualQuality - requiredQuality;

        let targetRep = 3.5 + (qualityGap * 5);
        targetRep = Math.min(5, Math.max(0, targetRep));

        const change = (targetRep - co.reputation) * 0.1;
        const repBefore = co.reputation;
        co.reputation = Math.min(5, Math.max(0, co.reputation + change));
        const repGrowthPct = repBefore > 0 ? (co.reputation - repBefore) / repBefore : 0;

        if (co.lastStats) {
            co.lastStats.actualQuality = actualQuality;
            co.lastStats.requiredQuality = requiredQuality;
            co.lastStats.targetRep = targetRep;
            co.lastStats.repGrowth = repGrowthPct;
            co.lastStats.currentRep = co.reputation;
        }

        if (Math.random() > provider.reliability) {
            const lost = Math.floor(revenue * 0.2);
            co.revenueLastMonth -= lost;
            co.cash -= lost;
            co.events.push(`📉 Problema de suministros. Ventas afectadas.`);
        }

        if (co.cash < -10000) {
            co.events.push("⛔ ¡PELIGRO! Caja muy negativa.");
        }

        return { revenue: co.revenueLastMonth, profit: co.profitLastMonth };
    },

    withdraw(amount) {
        if (!GameState.company) return;
        if (GameState.company.cash < amount) return { success: false, message: 'No hay suficiente caja.' };
        GameState.company.cash -= amount;
        GameState.cash += amount;
        return { success: true, message: `Retirados ${formatCurrency(amount)}.` };
    },

    deposit(amount) {
        if (!GameState.company) return;
        if (GameState.cash < amount) return { success: false, message: 'No tienes suficiente efectivo personal.' };
        GameState.cash -= amount;
        GameState.company.cash += amount;
        return { success: true, message: `Inyectados ${formatCurrency(amount)}.` };
    },

    sellCompany() {
        if (!GameState.company) return;
        const co = GameState.company;

        let annualProfit = 0;
        if (co.financialHistory && co.financialHistory.length > 0) {
            const last12 = co.financialHistory.slice(-12);
            annualProfit = last12.reduce((sum, m) => sum + m.profit, 0);
        } else {
            annualProfit = co.profitLastMonth * 12;
        }

        if (annualProfit < 0) annualProfit = 0;

        let upgradeMult = 1;
        if (co.maxStaff >= 10) upgradeMult *= 2;
        if (co.maxStaff >= 15) upgradeMult *= 2;

        const valuation = Math.floor(annualProfit * upgradeMult);
        const liquidationCash = co.cash;
        const totalExit = valuation + liquidationCash;

        if (!confirm(`OFERTA DE COMPRA\n\nBeneficio Anual: ${formatCurrency(annualProfit)}\nMultiplicador Mejoras: x${upgradeMult}\n\nValoración: ${formatCurrency(valuation)}\nCaja Actual: ${formatCurrency(liquidationCash)}\n\nTOTAL OPERACIÓN: ${formatCurrency(totalExit)}\n\n¿Vender empresa y salir?`)) return;

        GameState.cash += totalExit;
        GameState.company = null;
        GameState.jobTitle = 'Ex-Fundador (Desempleado)';
        GameState.salary = 0;
        JobSystem.currentCareerPath = 'none';

        return { success: true, message: `¡EXITO! Empresa vendida por ${formatCurrency(totalExit)}.` };
    }
};

/*******************************************************
 * JOB SYSTEM
 *******************************************************/
var BossMessages = {
    positive: [
        "Has superado las expectativas este año. Te lo mereces.",
        "Tu rendimiento ha sido excelente. Aquí tienes tu recompensa.",
        "Valoramos mucho tu compromiso con la empresa.",
        "Eres una pieza clave en el equipo. Sigue así.",
        "Me ha impresionado tu productividad. Aumento concedido.",
        "Tus resultados hablan por sí solos. Buen trabajo.",
        "La dirección está muy contenta contigo.",
        "Es justo reconocer tu esfuerzo con hechos.",
        "Gracias por tu dedicación extra. Disfruta del aumento.",
        "Personas como tú hacen crecer esta empresa.",
        "Tu liderazgo informal ha sido notable.",
        "Has gestionado los problemas con gran eficacia.",
        "Tu actitud positiva contagia al equipo. Gracias.",
        "Este aumento es solo el principio si sigues así.",
        "Confío plenamente en tu capacidad. Adelante.",
        "Tus métricas están por encima de la media. Felicidades.",
        "Has sabido adaptarte a los cambios. Bien hecho.",
        "Tu lealtad y esfuerzo tienen recompensa.",
        "Veo un gran futuro para ti aquí.",
        "Aprobado sin dudarlo. ¡Enhorabuena!"
    ],
    negative: [
        "El presupuesto está ajustado, pero haré una excepción pequeña.",
        "Esperaba más de ti, pero te daré un voto de confianza.",
        "No es el mejor momento para la empresa, confórmate con esto.",
        "Tu rendimiento ha sido justo, igual que este aumento.",
        "Te lo doy porque llevas tiempo, no por brillar.",
        "Deberías agradecer que haya algo de subida este año.",
        "Espero ver mejores números el próximo trimestre.",
        "No me convences del todo, pero vale.",
        "Considera esto un aviso: necesito más implicación.",
        "El mercado está difícil, esto es lo máximo posible.",
        "Otros lo merecían más, pero aquí tienes algo.",
        "No te acostumbres. El año que viene quiero más.",
        "A regañadientes, administración lo ha aprobado.",
        "Es poco, pero es mejor que nada.",
        "Tu actitud debe mejorar. Tómalo como incentivo.",
        "Estás en la cuerda floja, aprovéchalo.",
        "Ha costado convencer a finanzas. No me falles.",
        "Más vale pájaro en mano... aquí tienes un poco.",
        "No es lo que pedías, pero es lo que hay.",
        "Haz que valga la pena cada céntimo extra."
    ]
};

// --- GIGS POOL ---
var GIGS_POOL = [
    { title: 'Vender cromos', salary: 50, duration: 3, type: 'gig', desc: 'Pequeño trapicheo escolar.', reqMonths: 0, reqEdu: null },
    { title: 'Ventas en Wallapop', salary: 120, duration: 4, type: 'gig', desc: 'Limpiando el trastero.', reqMonths: 0, reqEdu: null },
    { title: 'Limpiar casas', salary: 200, duration: 5, type: 'gig', desc: 'Trabajo doméstico puntual.', reqMonths: 0, reqEdu: null },
    { title: 'Pasear perros', salary: 150, duration: 3, type: 'gig', desc: 'Sacar a Rufo y sus amigos.', reqMonths: 0, reqEdu: null },
    { title: 'Repartir publicidad', salary: 80, duration: 2, type: 'gig', desc: 'Buzoneo por el barrio.', reqMonths: 0, reqEdu: null },
    { title: 'Cuidar niños', salary: 180, duration: 4, type: 'gig', desc: 'Babysitter de fin de semana.', reqMonths: 0, reqEdu: null },
    { title: 'Ayudante mudanzas', salary: 220, duration: 2, type: 'gig', desc: 'Cargar cajas pesadas.', reqMonths: 0, reqEdu: null },
    { title: 'Cliente misterioso', salary: 100, duration: 3, type: 'gig', desc: 'Evaluar tiendas locales.', reqMonths: 0, reqEdu: null },
    { title: 'Transcribir audios', salary: 130, duration: 4, type: 'gig', desc: 'Trabajo freelance online.', reqMonths: 0, reqEdu: null },
    { title: 'Encuestador', salary: 90, duration: 2, type: 'gig', desc: 'Hacer preguntas por la calle.', reqMonths: 0, reqEdu: null },
    { title: 'DJ fiestas infantiles', salary: 160, duration: 3, type: 'gig', desc: 'Música y globoflexia.', reqMonths: 0, reqEdu: null },
    { title: 'Monitor comedor', salary: 210, duration: 5, type: 'gig', desc: 'Vigilar el patio del cole.', reqMonths: 0, reqEdu: null },
    { title: 'Cortar césped', salary: 140, duration: 4, type: 'gig', desc: 'Jardinería básica vecinal.', reqMonths: 0, reqEdu: null }
];

var JobSystem = {
    careers: {
        // --- BASICO ---
        'unskilled': [
            { title: 'Reponedor / Auxiliar', salary: 1000, reqMonths: 0, reqEdu: ['bachillerato', 'fp_medio'] },
            { title: 'Cajero / Atención', salary: 1150, reqMonths: 6, reqEdu: null },
            { title: 'Supervisor de Planta', salary: 1400, reqMonths: 24, reqEdu: null }
        ],

        // --- TRES DEPORTE (Sin ascensos) ---
        'tres_deporte': [
            { title: 'TRES DEPORTE', salary: 850, reqMonths: 0, reqEdu: 'bachillerato' }
        ],

        // --- FP ADMINISTRACION ---
        'admin_contable': [
            { title: 'Administrativo contable', salary: 1300, reqMonths: 0, reqEdu: 'fp_admin' },
            { title: 'Administrativo senior', salary: 1700, reqMonths: 12, reqEdu: 'fp_admin' },
            { title: 'Técnico de gestión financiera', salary: 2200, reqMonths: 30, reqEdu: 'fp_admin' },
            { title: 'Responsable administrativo', salary: 3000, reqMonths: 60, reqEdu: 'fp_admin' }
        ],
        'gestor_cobros': [
            { title: 'Gestor de cobros / facturación', salary: 1300, reqMonths: 0, reqEdu: 'fp_admin' },
            { title: 'Responsable de facturación', salary: 1700, reqMonths: 12, reqEdu: 'fp_admin' },
            { title: 'Credit controller', salary: 2200, reqMonths: 30, reqEdu: 'fp_admin' },
            { title: 'Jefe de admi. de clientes', salary: 3000, reqMonths: 60, reqEdu: 'fp_admin' }
        ],
        'admin_inmo': [
            { title: 'Administrativo comercial inmo.', salary: 1300, reqMonths: 0, reqEdu: 'fp_admin' },
            { title: 'Gestor de operaciones inmo.', salary: 1800, reqMonths: 18, reqEdu: 'fp_admin' },
            { title: 'Responsable de oficina inmo.', salary: 2400, reqMonths: 36, reqEdu: 'fp_admin' },
            { title: 'Director de zona', salary: 3200, reqMonths: 72, reqEdu: 'fp_admin' }
        ],

        // --- FP DAM ---
        'prog_apps': [
            { title: 'Programador junior (FP)', salary: 1500, reqMonths: 0, reqEdu: ['fp_dam', 'bootcamp'] },
            { title: 'Programador semi‑senior', salary: 2000, reqMonths: 18, reqEdu: ['fp_dam', 'bootcamp'] },
            { title: 'Desarrollador senior', salary: 2700, reqMonths: 36, reqEdu: ['fp_dam', 'bootcamp'] },
            { title: 'Tech lead', salary: 3800, reqMonths: 72, reqEdu: ['fp_dam', 'bootcamp'] }
        ],
        'sys_support': [
            { title: 'Técnico de soporte y sistemas', salary: 1400, reqMonths: 0, reqEdu: 'fp_dam' },
            { title: 'Administrador de sistemas', salary: 1900, reqMonths: 24, reqEdu: 'fp_dam' },
            { title: 'Ingeniero de sistemas', salary: 2500, reqMonths: 42, reqEdu: 'fp_dam' },
            { title: 'Responsable infraest. IT', salary: 3500, reqMonths: 72, reqEdu: 'fp_dam' }
        ],
        'mobile_dev': [
            { title: 'Desarrollador de apps móviles', salary: 1600, reqMonths: 0, reqEdu: ['fp_dam', 'bootcamp'] },
            { title: 'Mobile developer mid', salary: 2200, reqMonths: 24, reqEdu: ['fp_dam', 'bootcamp'] },
            { title: 'Senior mobile', salary: 3000, reqMonths: 48, reqEdu: ['fp_dam', 'bootcamp'] },
            { title: 'Lead mobile / arquitecto', salary: 4000, reqMonths: 84, reqEdu: ['fp_dam', 'bootcamp'] }
        ],

        // --- FP MANTENIMIENTO ---
        'maint_ind': [
            { title: 'Técnico mantenimiento ind.', salary: 1500, reqMonths: 0, reqEdu: 'fp_maint' },
            { title: 'Técnico senior', salary: 1900, reqMonths: 24, reqEdu: 'fp_maint' },
            { title: 'Jefe de equipo', salary: 2400, reqMonths: 48, reqEdu: 'fp_maint' },
            { title: 'Responsable de planta', salary: 3300, reqMonths: 84, reqEdu: 'fp_maint' }
        ],
        'clima': [
            { title: 'Técnico de climatización', salary: 1500, reqMonths: 0, reqEdu: 'fp_maint' },
            { title: 'Oficial de 1ª', salary: 1900, reqMonths: 24, reqEdu: 'fp_maint' },
            { title: 'Responsable servicio técnico', salary: 2400, reqMonths: 48, reqEdu: 'fp_maint' },
            { title: 'Jefe operaciones mant.', salary: 3200, reqMonths: 84, reqEdu: 'fp_maint' }
        ],
        'buildings': [
            { title: 'Técnico manten. edificios', salary: 1400, reqMonths: 0, reqEdu: 'fp_maint' },
            { title: 'Encargado de edificio', salary: 1800, reqMonths: 24, reqEdu: 'fp_maint' },
            { title: 'Supervisor multiedificio', salary: 2300, reqMonths: 48, reqEdu: 'fp_maint' },
            { title: 'Facility manager', salary: 3200, reqMonths: 84, reqEdu: 'fp_maint' }
        ],

        // --- GRADO ADE ---
        'analyst_fin': [
            { title: 'Analista financiero', salary: 1600, reqMonths: 0, reqEdu: 'grado_ade' },
            { title: 'Analista senior', salary: 2300, reqMonths: 36, reqEdu: 'grado_ade' },
            { title: 'Controller financiero', salary: 3000, reqMonths: 60, reqEdu: 'master_fin' },
            { title: 'Director financiero (CFO)', salary: 4500, reqMonths: 108, reqEdu: 'master_fin' }
        ],
        'consultant': [
            { title: 'Consultor de negocio', salary: 1700, reqMonths: 0, reqEdu: 'grado_ade' },
            { title: 'Consultor senior', salary: 2500, reqMonths: 36, reqEdu: 'grado_ade' },
            { title: 'Manager de proyecto', salary: 3500, reqMonths: 72, reqEdu: 'master_fin' },
            { title: 'Socio / Director', salary: 5000, reqMonths: 120, reqEdu: 'master_fin' }
        ],
        'sales_b2b': [
            { title: 'Gestor de cuentas empresa', salary: 1600, reqMonths: 0, reqEdu: 'grado_ade' },
            { title: 'Key account manager', salary: 2300, reqMonths: 36, reqEdu: 'grado_ade' },
            { title: 'Sales manager', salary: 3200, reqMonths: 72, reqEdu: 'grado_ade' },
            { title: 'Director comercial', salary: 4500, reqMonths: 108, reqEdu: 'master_fin' }
        ],

        // --- GRADO INFORMATICA ---
        'swe': [
            { title: 'Ingeniero de software', salary: 1800, reqMonths: 0, reqEdu: 'grado_cs' },
            { title: 'Software engineer mid', salary: 2500, reqMonths: 24, reqEdu: 'grado_cs' },
            { title: 'Senior software engineer', salary: 3400, reqMonths: 60, reqEdu: 'grado_cs' },
            { title: 'Engineering manager', salary: 4800, reqMonths: 108, reqEdu: 'master_ai' }
        ],
        'data': [
            { title: 'Data analyst / BI', salary: 1700, reqMonths: 0, reqEdu: 'grado_cs' },
            { title: 'Data analyst senior', salary: 2400, reqMonths: 36, reqEdu: 'grado_cs' },
            { title: 'Data scientist', salary: 3300, reqMonths: 60, reqEdu: 'master_ai' },
            { title: 'Head of data', salary: 5000, reqMonths: 108, reqEdu: 'master_ai' }
        ],
        'devops': [
            { title: 'DevOps / cloud engineer', salary: 1800, reqMonths: 0, reqEdu: 'grado_cs' },
            { title: 'DevOps mid', salary: 2600, reqMonths: 36, reqEdu: 'grado_cs' },
            { title: 'Senior / Cloud architect', salary: 3600, reqMonths: 72, reqEdu: 'grado_cs' },
            { title: 'Director infraest. cloud', salary: 5000, reqMonths: 120, reqEdu: 'master_ai' }
        ],

        // --- GRADO CIVIL ---
        'ing_obra': [
            { title: 'Ingeniero de obra', salary: 1700, reqMonths: 0, reqEdu: 'grado_civil' },
            { title: 'Jefe de obra', salary: 2400, reqMonths: 36, reqEdu: 'grado_civil' },
            { title: 'Jefe de proyecto', salary: 3300, reqMonths: 72, reqEdu: 'master_ing' },
            { title: 'Director construcción', salary: 4700, reqMonths: 120, reqEdu: 'master_ing' }
        ],
        'oficina_tecnica': [
            { title: 'Técnico oficina técnica', salary: 1600, reqMonths: 0, reqEdu: 'grado_civil' },
            { title: 'Ingeniero de proyectos', salary: 2300, reqMonths: 36, reqEdu: 'grado_civil' },
            { title: 'Responsable of. técnica', salary: 3000, reqMonths: 72, reqEdu: 'grado_civil' },
            { title: 'Director técnico', salary: 4300, reqMonths: 108, reqEdu: 'master_ing' }
        ],
        'urbz_consult': [
            { title: 'Consultor ingeniería / urb.', salary: 1700, reqMonths: 0, reqEdu: 'grado_civil' },
            { title: 'Consultor senior', salary: 2500, reqMonths: 48, reqEdu: 'grado_civil' },
            { title: 'Manager consultoría', salary: 3400, reqMonths: 84, reqEdu: 'master_ing' },
            { title: 'Socio / Director cons.', salary: 5000, reqMonths: 132, reqEdu: 'master_ing' }
        ]
    },
    get currentCareerPath() { return GameState.currentCareerPath || 'none'; },
    set currentCareerPath(v) { GameState.currentCareerPath = v; },
    get monthsInCurrentJob() { return GameState.monthsInCurrentJob || 0; },
    set monthsInCurrentJob(v) { GameState.monthsInCurrentJob = v; },
    get monthsSinceLastRaise() { return GameState.monthsSinceLastRaise || 0; },
    set monthsSinceLastRaise(v) { GameState.monthsSinceLastRaise = v; },

    getCareerPath(pathKey) {
        return this.careers[pathKey];
    },

    nextTurn() {
        if (GameState.company) return;

        // Handle Gig Expiration
        if (GameState.jobType === 'gig') {
            if (GameState.gigRemaining > 0) {
                GameState.gigRemaining--;
            }
            if (GameState.gigRemaining <= 0) {
                // Gig finished
                // Gig finished - Show modal instead of toast for better visibility
                UI.showModal(
                    '⏰ Trabajo Finalizado',
                    'Tu trabajo temporal ha terminado. Ahora estás desempleado.<br><br>Busca un nuevo trabajo en la pestaña <strong>Trabajo</strong>.',
                    [{ text: 'Entendido', style: 'primary', fn: () => UI.updateJob(this) }]
                );
                GameState.jobTitle = 'Desempleado';
                GameState.salary = 0;
                GameState.jobType = 'unemployed';
                this.currentCareerPath = 'none';
                UI.updateJob(this); // Refresh UI if open
                return;
            }
        }

        if (!GameState.isStudying) {
            this.monthsInCurrentJob += 1;
            this.monthsSinceLastRaise = (this.monthsSinceLastRaise || 0) + 1; // Track for TRES DEPORTE salary requests
        } else {
            this.monthsInCurrentJob += 0.5;
            this.monthsSinceLastRaise += 0.5;
        }

        // Generar nuevos gigs para el mes siguiente
        this.generateMonthlyGigs();
    },

    generateMonthlyGigs() {
        // Shuffle and pick 2
        const shuffled = [...GIGS_POOL].sort(() => 0.5 - Math.random());
        GameState.currentGigs = shuffled.slice(0, 2).map(gig => ({ ...gig, path: 'temporary' }));
    },

    getAvailablePromotions() {
        if (this.currentCareerPath === 'entrepreneur' || this.currentCareerPath === 'none' || this.currentCareerPath === 'temporary') return null;

        const path = this.careers[this.currentCareerPath];
        if (!path) return null; // Safe guard
        const currentJobIndex = path.findIndex(j => j.title === GameState.jobTitle);

        if (currentJobIndex === -1 || currentJobIndex >= path.length - 1) return null;
        const nextJob = path[currentJobIndex + 1];
        return nextJob;
    },

    promote() {
        // SPECIAL CASE: TRES DEPORTE - No promotions, but can ask for raise every 2 months
        if (GameState.jobTitle === 'TRES DEPORTE') {
            const monthsSinceLastRequest = this.monthsSinceLastRaise || 0;

            if (monthsSinceLastRequest < 2) {
                return {
                    success: false,
                    message: `Tu jefa te ignora. Espera ${2 - monthsSinceLastRequest} mes(es) más para volver a intentarlo.`
                };
            }

            // Reset counter
            this.monthsSinceLastRaise = 0;

            // Array of comic excuses
            const excuses = [
                "Tu jefa dice que... primero tendrías que vender más mochilas. Por cierto, ¿puedes trabajar el sábado?",
                "Tu jefa dice que... arréglate esa barba. Pareces un vagabundo, no un empleado.",
                "Tu jefa dice que... si quieres más dinero, vende tu riñón. Por cierto, ¿puedes trabajar el domingo?",
                "Tu jefa dice que... ¿aumento? ¡Pero si ya tienes un trabajo!",
                "Tu jefa dice que... la empresa está en crisis mientras ella se va de crucero.",
                "Tu jefa dice que... el año que viene seguro, confía en mí. Por cierto, ¿puedes trabajar el sábado?",
                "Tu jefa dice que... ¿has probado buscar monedas en la calle?",
                "Tu jefa dice que... con tu rendimiento deberías PAGAR por trabajar aquí. ¿Y ese día que te pusiste malo? Eso nos costó dinero.",
                "Tu jefa dice que... primero aprende a llegar puntual.",
                "Tu jefa dice que... ¿aumento? ¡Qué gracioso eres! Por cierto, ¿puedes trabajar el domingo?",
                "Tu jefa dice que... yo te lo daría, pero los de arriba no me dejan. Ya sabes cómo son.",
                "Tu jefa dice que... estás ganando experiencia, ¿no te basta? Y esas vacaciones que pediste en verano, ¿te parecen poco?",
                "Tu jefa dice que... te pagaremos en exposición y buen rollo.",
                "Tu jefa dice que... ya puedes entrenar sin pagar en el gimnasio, ¿qué más quieres?",
                "Tu jefa dice que... si tanto lo necesitas, vende cosas en Wallapop. Por cierto, ¿puedes trabajar el sábado?",
                "Tu jefa dice que... el café gratis es tu aumento.",
                "Tu jefa dice que... ¿aumento? No veo que vendas más que Pedro. Y encima te pones malo cada dos por tres.",
                "Tu jefa dice que... estamos esperando a que la economía mejore. Por cierto, ¿puedes trabajar el domingo?",
                "Tu jefa dice que... con 850€ vives como un rey en 1985.",
                "Tu jefa dice que... primero demuestra que mereces lo que ya ganas. ¿Y ese día de baja el mes pasado?",
                "Tu jefa dice que... agradece que no te hemos bajado el sueldo.",
                "Tu jefa dice que... ¿sabes cuánta gente querría tu puesto? Y tú cogiendo vacaciones...",
                "Tu jefa dice que... el trabajo en equipo no se paga, se siente. Por cierto, ¿puedes trabajar el sábado?",
                "Tu jefa dice que... hemos decidido invertir en un nuevo logo en vez de salarios. Ah, y necesitamos que vengas el domingo.",
                "Tu jefa dice que... ¿otra vez con lo mismo? La semana pasada te fuiste 'malo' y ahora quieres aumento.",
                "Tu jefa dice que... las vacaciones son un privilegio, no un derecho. Y menos si quieres más dinero.",
                "Tu jefa dice que... llevas mal puesto el uniforme. Así no puedo subirte el sueldo.",
                "Tu jefa dice que... ¿con esos pendientes? Primero quítatelos y luego hablamos de dinero.",
                "Tu jefa dice que... ese peinado no es adecuado para la empresa. Arréglate primero.",
                "Tu jefa dice que... el uniforme tiene que estar impecable. Ven mañana bien vestido y lo hablamos."
            ];

            const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
            return { success: false, message: randomExcuse };
        }

        // NORMAL PROMOTION LOGIC
        const nextJob = this.getAvailablePromotions();
        if (!nextJob) return { success: false, message: 'No hay ascensos disponibles.' };

        if (Math.floor(this.monthsInCurrentJob) < nextJob.reqMonths) {
            return { success: false, message: `Faltan ${(nextJob.reqMonths - this.monthsInCurrentJob).toFixed(1)} meses de experiencia.` };
        }

        if (nextJob.reqEdu) {
            if (!this.checkEducation(nextJob.reqEdu)) return { success: false, message: `Necesitas estudios de tipo: ${nextJob.reqEdu}` };
        }

        GameState.salary = nextJob.salary;
        GameState.jobTitle = nextJob.title;
        this.monthsInCurrentJob = 0;
        return { success: true, message: `¡Ascendido a ${nextJob.title}! Nuevo salario base: ${nextJob.salary}€` };
    },

    checkEducation(req) {
        if (!req) return true;

        // OR Logic for Arrays
        if (Array.isArray(req)) {
            return req.some(r => GameState.education.includes(r));
        }

        // Check strict match for new system (e.g. "Grado en ADE")
        if (GameState.education.includes(req)) return true;

        // Legacy Fallback (just in case)
        return GameState.education.some(e => {
            if (req === 'FP') return e.includes('FP') || e.includes('Grado') || e.includes('Ingeniería');
            if (req === 'Carrera') return e.includes('Grado') || e.includes('Ingeniería');
            if (req === 'Master') return e.includes('MBA') || e.includes('Master');
            return false;
        });
    },

    getAllVacancies() {
        const allJobs = [];
        for (const [pathKey, jobs] of Object.entries(this.careers)) {
            jobs.forEach(job => {
                if (job.title === GameState.jobTitle) return;
                allJobs.push({ ...job, path: pathKey });
            });
        }

        // Inject Gigs (Persisted Monthly)
        if (!GameState.currentGigs || GameState.currentGigs.length === 0) {
            this.generateMonthlyGigs();
        }

        GameState.currentGigs.forEach(gig => {
            allJobs.push(gig);
        });

        return allJobs;
    },

    applyToJob(jobTitle) {
        let targetJob, targetPath;

        // Check Careers
        for (const [pathKey, jobs] of Object.entries(this.careers)) {
            const found = jobs.find(j => j.title === jobTitle);
            if (found) {
                targetJob = found;
                targetPath = pathKey;
                break;
            }
        }

        // Check Gigs
        if (!targetJob) {
            targetJob = GIGS_POOL.find(g => g.title === jobTitle);
            targetPath = 'temporary';
        }

        if (!targetJob) return { success: false, message: 'Oferta no válida.' };
        if (targetJob.reqEdu && !this.checkEducation(targetJob.reqEdu)) {
            return { success: false, message: `Requisito académico no cumplido: ${targetJob.reqEdu}` };
        }

        // STRICT EXPERIENCE CHECK
        // If applying from outside (Vacancy List), you can only enter at level 0 (Entry Level).
        // Higher positions must be earned via Promotion.
        if (targetJob.reqMonths > 0) {
            return { success: false, message: `Este puesto requiere experiencia interna previa. Debes empezar por un puesto de acceso (Nivel 0) y ascender.` };
        }

        if (GameState.company) {
            if (!confirm('Al aceptar este trabajo cerrarás tu empresa. ¿Seguro?')) return { success: false, message: 'Operación cancelada' };
            GameState.company = null;
        }

        this.switchJobEnhanced(targetPath, targetJob);
        return { success: true, message: `¡Contratado como ${targetJob.title}!` };
    },

    switchJobEnhanced(pathKey, jobObj) {
        this.currentCareerPath = pathKey;
        GameState.jobTitle = jobObj.title;
        GameState.salary = jobObj.salary;
        this.monthsInCurrentJob = 0;
        this.monthsSinceLastRaise = 0; // Reset raise timer on new job

        if (jobObj.type === 'gig') {
            GameState.jobType = 'gig';
            GameState.gigRemaining = jobObj.duration;
        } else {
            GameState.jobType = 'career';
            GameState.gigRemaining = 0;
        }
    },

    requestRaise() {
        const raisePct = (Math.floor(Math.random() * 6) + 1); // 1 to 6%
        let msgList = raisePct >= 3 ? BossMessages.positive : BossMessages.negative;
        const msg = msgList[Math.floor(Math.random() * msgList.length)];

        const oldSalary = GameState.salary;
        const increase = Math.floor(oldSalary * (raisePct / 100));
        GameState.salary += increase;
        this.monthsSinceLastRaise = 0;

        return {
            success: true,
            increase: increase,
            raisePct: raisePct,
            message: `"${msg}"\n\nTu salario ha subido un ${raisePct}% (+${formatCurrency(increase)}).`
        };
    }
};

/*******************************************************
 * UI
 *******************************************************/
const formatCurrency = (amount, decimals = 2) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(amount);
};
const formatPercent = (val) => (val * 100).toFixed(2) + '%';

var UI = {
    chartTimeframe: 24, // Default 2 years
    stockChartTimeframe: 24,
    currentOpenStock: null,
    // State for animations
    lastCash: 0,
    lastNetWorth: 0,

    animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(progress * (end - start) + start);
            obj.textContent = formatCurrency(current);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.textContent = formatCurrency(end);
            }
        };
        window.requestAnimationFrame(step);
    },

    updateHeader() {
        const cashDisplay = document.getElementById('money-display');
        const netWorthDisplay = document.getElementById('net-worth-display');

        // Animate Cash
        if (cashDisplay) {
            if (this.lastCash !== GameState.cash) {
                this.animateValue(cashDisplay, this.lastCash, GameState.cash, 1000);
                this.lastCash = GameState.cash;
            } else {
                cashDisplay.textContent = formatCurrency(GameState.cash);
            }
        }

        // Animate Net Worth
        if (netWorthDisplay) {
            if (this.lastNetWorth !== GameState.netWorth) {
                this.animateValue(netWorthDisplay, this.lastNetWorth, GameState.netWorth, 1000);
                this.lastNetWorth = GameState.netWorth;
            } else {
                netWorthDisplay.textContent = formatCurrency(GameState.netWorth);
            }
        }

        document.getElementById('date-display').textContent = `Mes: ${GameState.month} | Año: ${GameState.year}`;
        const pName = document.getElementById('header-player-name');
        if (pName) {
            pName.textContent = GameState.playerName || 'Jugador';
        }
    },

    // --- MODALS ---
    showModal(title, content, actions = [], isHTML = false) {
        // Remove existing
        const existing = document.querySelector('.custom-modal-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'custom-modal-content';
        modal.id = 'modal-content'; // For referencing

        const titleEl = document.createElement('h2');
        titleEl.textContent = title;
        modal.appendChild(titleEl);

        const bodyEl = document.createElement('div');
        bodyEl.className = 'custom-modal-body';
        if (isHTML) {
            bodyEl.innerHTML = content;
        } else {
            content.split('\n').forEach(line => {
                const p = document.createElement('p');
                p.textContent = line;
                bodyEl.appendChild(p);
            });
        }
        modal.appendChild(bodyEl);

        const footer = document.createElement('div');
        footer.className = 'custom-modal-footer';

        if (actions.length === 0) {
            // Default close
            const btn = document.createElement('button');
            btn.textContent = 'Cerrar';
            btn.className = 'btn-modal-action btn-secondary';
            btn.onclick = () => overlay.remove();
            footer.appendChild(btn);
        } else {
            actions.forEach(action => {
                const btn = document.createElement('button');
                btn.textContent = action.text;
                // Map style strings to simplified classes
                let btnClass = 'btn-secondary';
                if (action.style === 'primary' || action.style === 'success') btnClass = 'btn-primary';
                if (action.style === 'danger') btnClass = 'btn-danger';

                btn.className = `btn-modal-action ${btnClass}`;

                btn.onclick = () => {
                    overlay.remove();
                    if (action.fn) action.fn();
                };
                footer.appendChild(btn);
            });
        }

        modal.appendChild(footer);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    },

    confirmModal(title, text, onConfirm) {
        this.showModal(title, text, [
            { text: 'Cancelar', style: 'secondary', fn: null },
            { text: 'Confirmar', style: 'primary', fn: onConfirm }
        ]);
    },
    updateDashboard() {
        const nw = updateNetWorth();

        // DATA PREP
        let cash = GameState.cash;
        let stocksVal = 0;
        GameState.inventory.stocks.forEach(s => {
            const st = StockMarket.getStock(s.symbol);
            stocksVal += s.quantity * (st ? st.price : s.avgPrice);
        });

        let reValue = 0;
        let reMortgage = 0;
        GameState.inventory.realEstate.forEach(p => reValue += p.price);
        GameState.loans.forEach(l => {
            if (l.type === 'Hipotecario') reMortgage += l.remainingBalance;
        });
        let reEquity = reValue - reMortgage;

        let rentIncome = GameState.inventory.realEstate.reduce((acc, p) => acc + p.monthlyRent, 0);
        let holdingIncome = (GameState.ownedCompanies || []).reduce((acc, c) => acc + (c.baselineProfit || 0), 0);
        // Also add active company profit if receiving salary/dividends or just raw profit?
        // Request says "beneficio mes", usually implies net profit of the company.
        if (GameState.company) {
            // holdingIncome += (GameState.company.profitLastMonth || 0); 
            // FIX: User requested to NOT count company profit in personal flow, only salary.
            // Salary is already in GameState.salary.
        }

        let loanPayments = 0;
        GameState.loans.forEach(l => { loanPayments += l.monthlyPayment; });

        const totalIncome = GameState.salary + rentIncome + holdingIncome;
        const totalExpenses = GameState.expenses + loanPayments;
        const monthlyFlow = totalIncome - totalExpenses;

        let companyCount = (GameState.company ? 1 : 0) + (GameState.ownedCompanies ? GameState.ownedCompanies.length : 0);
        // holdingIncome is already calculated above as sum of profits

        // DOM UPDATE
        // DOM UPDATE
        const container = document.getElementById('dashboard-view');
        if (!container) return;

        // Clear existing to rebuild
        container.innerHTML = `
        <div class="dashboard-container">
            <div class="section-header">
                <h2>Resumen Ejecutivo</h2>
                <span style="color:#94a3b8; font-size:0.9rem;">Edad: ${GameState.age} años | Mes: ${GameState.month}</span>
            </div>

            <!-- KPI ROW -->
            <div class="summary-kpi-row" style="grid-template-columns: 1fr 1fr;">
                <div class="kpi-box" style="border-bottom: 2px solid #facc15;">
                    <div class="kpi-label">Patrimonio Neto</div>
                    <div class="kpi-value" style="color:#facc15">${formatCurrency(nw)}</div>
                </div>
                <div class="kpi-box" style="border-bottom: 2px solid #38bdf8;">
                    <div class="kpi-label">Flujo Mensual</div>
                    <div class="kpi-value" style="color:${monthlyFlow >= 0 ? '#38bdf8' : '#f87171'}">${monthlyFlow >= 0 ? '+' : ''}${formatCurrency(monthlyFlow)}</div>
                    <div class="kpi-sub">Ing: ${formatCurrency(totalIncome)}<br>Gas: ${formatCurrency(totalExpenses)}</div>
                </div>
            </div>

            <!-- ASSET BREAKDOWN -->
            <div class="dashboard-grid">
                <div class="dashboard-card">

                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; margin-bottom:15px; padding-bottom:10px;">
                        <h3 style="margin:0; color:#cbd5e1; font-size:1.1rem;">📈 Evolución</h3>
                        <div style="display:flex; gap:10px;">
                            <button class="btn-filter ${UI.chartTimeframe === 6 ? 'active' : ''}" onclick="UI.chartTimeframe=6; UI.updateDashboard()">6M</button>
                            <button class="btn-filter ${UI.chartTimeframe === 24 ? 'active' : ''}" onclick="UI.chartTimeframe=24; UI.updateDashboard()">2A</button>
                            <button class="btn-filter ${UI.chartTimeframe === 999 ? 'active' : ''}" onclick="UI.chartTimeframe=999; UI.updateDashboard()">MAX</button>
                        </div>
                    </div>
                    <div style="height:300px; width:100%;">
                        <canvas id="net-worth-chart"></canvas>
                    </div>
                </div>

                <div class="dashboard-card">
                    <h3 style="margin-top:0; color:#cbd5e1; font-size:1.1rem; margin-bottom:15px; border-bottom:1px solid #334155; padding-bottom:10px;">📊 Desglose de Activos</h3>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:15px;">
                        <div>
                            <div style="font-size:0.8rem; color:#94a3b8;">Liquidez (Caja)</div>
                            <div style="font-size:1.1rem; font-weight:bold; color:#4ade80;">${formatCurrency(cash)}</div>
                        </div>
                        <div>
                            <div style="font-size:0.8rem; color:#94a3b8;">Bolsa</div>
                            <div style="font-size:1.1rem; font-weight:bold;">${formatCurrency(stocksVal)}</div>
                        </div>
                        <div>
                            <div style="font-size:0.8rem; color:#94a3b8;">Inmobiliario (Neto)</div>
                            <div style="font-size:1.1rem; font-weight:bold;">${formatCurrency(reEquity)}</div>
                        </div>
                        <div>
                            <div style="font-size:0.8rem; color:#94a3b8;">Empresas</div>
                            <div style="font-size:1.1rem; font-weight:bold;">${companyCount}</div> 
                        </div>
                    </div>
                    <div style="border-top:1px dashed #334155; padding-top:10px;">
                        <div style="font-size:0.8rem; color:#94a3b8;">Beneficio Empresas</div>
                        <div style="font-size:1rem; font-weight:bold; color:${holdingIncome >= 0 ? '#4ade80' : '#f87171'}">${formatCurrency(holdingIncome)}/mes</div>
                    </div>
                </div>
            </div>
        </div>
    `;

        // Re-draw chart (Filtered)
        const h = GameState.history;
        const limit = UI.chartTimeframe;
        const slicedHistory = {
            labels: h.labels.slice(-limit),
            netWorth: h.netWorth.slice(-limit),
            cash: h.cash.slice(-limit),
            debt: h.debt.slice(-limit)
        };
        ChartModule.drawChart('net-worth-chart', slicedHistory);
    },
    updateMarket() {
        const container = document.getElementById('market-view');
        if (!container) return;

        // DATA
        const stocks = StockMarket.stocks;
        const portfolio = GameState.inventory.stocks;

        // CALCS
        let portValue = 0;
        let costBasis = 0;
        portfolio.forEach(p => {
            const s = StockMarket.getStock(p.symbol);
            if (s) {
                portValue += p.quantity * s.price;
                costBasis += p.quantity * p.avgPrice;
            }
        });
        const totalReturn = portValue - costBasis;
        const returnDir = totalReturn >= 0 ? '+' : '';
        const returnClass = totalReturn >= 0 ? '#4ade80' : '#f87171';

        // RENDER
        container.innerHTML = `
                    <div class="dashboard-container">
                        <div class="section-header">
                            <h2>Mercado de Valores</h2>
                            <span style="color:#94a3b8; font-size:0.9rem;">IBEX 35</span>
                        </div>

                        <!-- MARKET HERO (Vertical Layout for Mobile) -->
                        <div class="market-hero" style="display:flex; flex-direction:column; gap:12px; background:#1e293b; border-radius:12px; padding:16px; margin-bottom:20px;">
                            <div style="border-bottom:1px solid #334155; padding-bottom:12px;">
                                <div style="font-size:0.75rem; color:#94a3b8; text-transform:uppercase; margin-bottom:4px;">Valor Cartera</div>
                                <div style="font-size:1.6rem; font-weight:bold; color:#fff;">${formatCurrency(portValue)}</div>
                            </div>
                            <div style="border-bottom:1px solid #334155; padding-bottom:12px;">
                                <div style="font-size:0.75rem; color:#94a3b8; text-transform:uppercase; margin-bottom:4px;">Retorno Total</div>
                                <div style="font-size:1.6rem; font-weight:bold; color:${returnClass}">${returnDir}${formatCurrency(totalReturn)}</div>
                            </div>
                            <div>
                                <div style="font-size:0.75rem; color:#94a3b8; text-transform:uppercase; margin-bottom:4px;">Rentabilidad</div>
                                <div style="font-size:1.6rem; font-weight:bold; color:${returnClass}">${costBasis > 0 ? (totalReturn / costBasis * 100).toFixed(2) : '0.00'}%</div>
                            </div>
                        </div>

                        <!-- TICKER TAPE / GRID -->
                        <div class="job-section-spacer">
                            <h3 style="color:#cbd5e1; margin-bottom:15px;">📊 Cotizaciones</h3>
                            <p style="color:#94a3b8; font-size:0.85rem; margin-bottom:10px;">Toca para operar</p>
                            <div class="market-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(160px, 1fr)); gap:10px;">
                                ${stocks.map(stock => {
            const trendClass = stock.trend >= 0 ? 'rising' : 'falling';
            const trendColor = stock.trend >= 0 ? '#4ade80' : '#f87171';
            const sign = stock.trend >= 0 ? '+' : '';
            return `
                                    <div class="stock-chip ${trendClass}" data-symbol="${stock.symbol}" style="background:#1e293b; border-radius:8px; padding:10px; cursor:pointer; transition:all 0.2s; border:1px solid #334155;">
                                        <div>
                                            <div style="font-weight:bold; font-size:1rem; color:white;">${stock.symbol}</div>
                                            <div style="font-size:0.75rem; color:#94a3b8; margin-bottom:6px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${stock.name}</div>
                                        </div>
                                        <div style="text-align:right;">
                                            <div style="font-weight:bold; font-size:1.05rem; color:white;">${formatCurrency(stock.price)}</div>
                                            <div style="font-size:0.8rem; color:${trendColor}; font-weight:600;">${sign}${(stock.trend * 100).toFixed(2)}%</div>
                                        </div>
                                    </div>
                                    `;
        }).join('')}
                            </div>
                        </div>

                        <!-- POSITIONS CARDS (RESPONSIVE) -->
                         <div class="dashboard-card">
                            <h3 style="margin-top:0; color:#cbd5e1; margin-bottom:15px; border-bottom:1px solid #334155; padding-bottom:10px;">💼 Mis Posiciones</h3>
                            ${portfolio.length === 0 ? '<p style="color:#64748b;">No hay posiciones abiertas.</p>' :
                `<div style="display:flex; flex-direction:column; gap:10px;">
                            ${portfolio.map(p => {
                    const s = StockMarket.getStock(p.symbol);
                    if (!s) return '';
                    const val = p.quantity * s.price;
                    const pl = val - (p.quantity * p.avgPrice);
                    const plColor = pl >= 0 ? '#4ade80' : '#f87171';
                    const plSign = pl >= 0 ? '+' : '';
                    // Calculate percentage
                    const invested = p.quantity * p.avgPrice;
                    const plPercent = invested > 0 ? ((pl / invested) * 100).toFixed(2) : 0;
                    return `
                                <div style="background:#1e293b; border-radius:8px; padding:12px; border-left:3px solid ${plColor};">
                                    <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:10px;">
                                        <div>
                                            <div style="font-weight:bold; font-size:1.1rem; color:white;">${p.symbol}</div>
                                            <div style="font-size:0.8rem; color:#94a3b8;">${s.name}</div>
                                        </div>
                                        <button onclick="UI.openStockModal(StockMarket.getStock('${p.symbol}'))" style="background:#dc2626; color:white; border:none; padding:6px 12px; border-radius:4px; cursor:pointer; font-size:0.85rem; font-weight:600;">VENDER</button>
                                    </div>
                                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:0.85rem;">
                                        <div>
                                            <div style="color:#94a3b8; font-size:0.75rem;">Cantidad</div>
                                            <div style="color:white; font-weight:600;">${p.quantity}</div>
                                        </div>
                                        <div>
                                            <div style="color:#94a3b8; font-size:0.75rem;">Precio Medio</div>
                                            <div style="color:white; font-weight:600;">${formatCurrency(p.avgPrice)}</div>
                                        </div>
                                        <div>
                                            <div style="color:#94a3b8; font-size:0.75rem;">Valor Actual</div>
                                            <div style="color:white; font-weight:600;">${formatCurrency(val)}</div>
                                        </div>
                                        <div>
                                            <div style="color:#94a3b8; font-size:0.75rem;">Ganancia/Pérdida</div>
                                            <div style="color:${plColor}; font-weight:bold;">${plSign}${formatCurrency(pl)} <span style="font-size:0.9rem;">(${plSign}${plPercent}%)</span></div>
                                        </div>
                                    </div>
                                </div>
                                `;
                }).join('')}
                        </div>`
            }
                        </div>
                    </div>
                `;

        // EVENTS
        container.querySelectorAll('.stock-chip').forEach(chip => {
            chip.onclick = () => {
                const symbol = chip.dataset.symbol;
                const stock = StockMarket.getStock(symbol);
                if (stock) UI.openStockModal(stock);
            };
        });
    },

    openStockModal(stock) {
        const portfolioItem = GameState.inventory.stocks.find(s => s.symbol === stock.symbol);
        const owned = portfolioItem ? portfolioItem.quantity : 0;

        // NEW MOBILE-FIRST LAYOUT
        // We use a flex-column container that takes up the full modal height
        // content-header: Fixed
        // content-body: Scrollable (Chart + Stats)
        // content-footer: Fixed (Buttons)

        const msg = `
                    <div class="stock-ops-container" style="display:flex; flex-direction:column; height:80vh; max-height:80vh;">
                        
                        <!-- 1. HEADER (Fixed) -->
                        <div class="ops-header" style="flex:0 0 auto; border-bottom:1px solid #334155; padding-bottom:10px; margin-bottom:10px;">
                            <div style="display:flex; justify-content:space-between; align-items:start;">
                                <div>
                                    <h3 style="margin:0; font-size:1.3rem; color:white;">${stock.name}</h3>
                                    <span style="color:#94a3b8; font-size:0.9rem;">${stock.symbol}</span>
                                </div>
                                <div style="text-align:right;">
                                    <div style="font-size:1.4rem; font-weight:bold; color:${stock.trend >= 0 ? '#4ade80' : '#f87171'}">
                                        ${formatCurrency(stock.price)}
                                    </div>
                                    <span style="font-size:0.85rem; color:${stock.trend >= 0 ? '#86efac' : '#fca5a5'}">
                                        ${stock.trend >= 0 ? '▲' : '▼'} ${(Math.abs(stock.trend) * 100).toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- 2. BODY (Scrollable) -->
                        <div class="ops-body" style="flex:1 1 auto; overflow-y:auto; min-height:0; padding-right:5px;">
                            
                            <!-- Chart Container -->
                            <div style="background:#0f172a; border-radius:8px; padding:10px; margin-bottom:15px; position:relative;">
                                <div style="height:180px; width:100%;">
                                    <canvas id="stock-modal-chart"></canvas>
                                </div>
                                <div id="chart-overlay-info" style="position:absolute; top:10px; left:10px; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:4px; font-size:0.75rem; color:white; pointer-events:none;">
                                    Rendimiento: <span id="chart-roi-display">--</span>
                                </div>
                            </div>

                            <!-- Timeframe Selectors -->
                            <div class="timeframe-segmented" style="display:flex; background:#1e293b; padding:4px; border-radius:8px; margin-bottom:20px;">
                                <button class="btn-seg active" data-tf="24" onclick="UI.changeTimeframe(24)" style="flex:1; background:transparent; border:none; color:#cbd5e1; padding:6px; border-radius:6px;">2 Años</button>
                                <button class="btn-seg" data-tf="6" onclick="UI.changeTimeframe(6)" style="flex:1; background:transparent; border:none; color:#cbd5e1; padding:6px; border-radius:6px;">6 Meses</button>
                                <button class="btn-seg" data-tf="999" onclick="UI.changeTimeframe(999)" style="flex:1; background:transparent; border:none; color:#cbd5e1; padding:6px; border-radius:6px;">Todo</button>
                            </div>

                            <!-- User Portfolio Stats -->
                            <div class="portfolio-strip" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:20px;">
                                <div style="background:#1e293b; padding:10px; border-radius:8px; text-align:center;">
                                    <span style="display:block; font-size:0.75rem; color:#94a3b8;">En Cartera</span>
                                    <span style="font-size:1.1rem; color:white; font-weight:bold;">${owned}</span>
                                </div>
                                <div style="background:#1e293b; padding:10px; border-radius:8px; text-align:center;">
                                    <span style="display:block; font-size:0.75rem; color:#94a3b8;">Valor Actual</span>
                                    <span style="font-size:1.1rem; color:#facc15; font-weight:bold;">${formatCurrency(owned * stock.price)}</span>
                                </div>
                            </div>

                        </div>

                        <!-- 3. FOOTER (Fixed Actions) -->
                        <div class="ops-footer" style="flex:0 0 auto; border-top:1px solid #334155; padding-top:15px; margin-top:10px;">
                            <div style="margin-bottom:10px;">
                                <input type="number" id="stock-action-qty" placeholder="Cantidad de Acciones" 
                                    style="width:100%; padding:12px; background:#1e293b; border:1px solid #475569; border-radius:8px; color:white; font-size:1rem; text-align:center;">
                            </div>
                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                                <button id="btn-modal-buy" class="btn-action" style="background:#22c55e; color:#0f172a; border:none; padding:12px; border-radius:8px; font-weight:bold; font-size:1rem;">COMPRAR</button>
                                <button id="btn-modal-sell" class="btn-action" style="background:#ef4444; color:white; border:none; padding:12px; border-radius:8px; font-weight:bold; font-size:1rem;">VENDER</button>
                            </div>
                        </div>

                    </div>
                    `;

        // Overwrite the default modal buttons logic by passing empty array
        // We handle buttons manually inside the HTML
        // CRITICAL: We replace \n with space because UI.showModal naïvely replaces \n with <br>, breaking HTML tags.
        this.showModal(' ', msg.replace(/\n/g, ' '), [], true);

        // Attach Handlers
        setTimeout(() => {
            // Title fix (hack to remove default header if showModal adds one)
            const modalTitle = document.querySelector('#modal-content h2');
            if (modalTitle) modalTitle.style.display = 'none'; // Hide default title

            document.getElementById('btn-modal-buy').onclick = (e) => {
                const qty = parseInt(document.getElementById('stock-action-qty').value);
                if (!qty || qty <= 0) return alert('Cantidad inválida');
                const res = StockMarket.buyStock(stock.symbol, qty);
                if (res.success) {
                    // Close the modal first
                    const overlay = e.target.closest('.custom-modal-overlay');
                    if (overlay) overlay.remove();

                    alert(res.message);
                    UI.updateHeader();
                    UI.updateDashboard();
                    UI.updateMarket();
                } else {
                    alert(res.message);
                }
            };

            document.getElementById('btn-modal-sell').onclick = (e) => {
                const qty = parseInt(document.getElementById('stock-action-qty').value);
                if (!qty || qty <= 0) return alert('Cantidad inválida');
                if (owned < qty) return alert('No tienes suficientes acciones');
                const res = StockMarket.sellStock(stock.symbol, qty);
                if (res.success) {
                    // Close the modal first
                    const overlay = e.target.closest('.custom-modal-overlay');
                    if (overlay) overlay.remove();

                    alert(res.message);
                    UI.updateHeader();
                    UI.updateDashboard();
                    UI.updateMarket();
                } else {
                    alert(res.message);
                }
            };
        }, 50);

        // Init Chart
        UI.currentOpenStock = stock;
        UI.stockChartTimeframe = 24;
        setTimeout(() => UI.updateStockModalChart(), 100);
    },

    changeTimeframe(months) {
        this.stockChartTimeframe = months;
        this.updateStockModalChart();

        // Update Active State Visuals
        document.querySelectorAll('.btn-seg').forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.tf) === months) btn.classList.add('active');
        });
    },

    updateStockModalChart() {
        if (!UI.currentOpenStock) return;
        ChartModule.drawStockChart('stock-modal-chart', UI.currentOpenStock, UI.stockChartTimeframe);

        // Calculate ROI for timeframe
        const h = UI.currentOpenStock.history || [];
        let roi = 0;
        let subset = h;

        if (UI.stockChartTimeframe !== 999) {
            subset = h.slice(-UI.stockChartTimeframe);
        }

        if (subset.length > 0) {
            const start = subset[0];
            const end = subset[subset.length - 1];
            if (start > 0) roi = (end - start) / start;
        }

        // Update ROI Display
        const roiEl = document.getElementById('chart-roi-display');
        if (roiEl) {
            const sign = roi >= 0 ? '+' : '';
            const color = roi >= 0 ? '#4ade80' : '#f87171';
            const bg = roi >= 0 ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)';
            roiEl.textContent = `${sign}${(roi * 100).toFixed(2)}%`;
            roiEl.style.color = color;
            roiEl.style.backgroundColor = bg;
        }

    },
    updateBank(BankModule) {
        const container = document.getElementById('bank-view');
        if (!container) return;

        // DATA
        const limit = BankModule.getMaxLoanAmount();
        const loans = GameState.loans;

        // RENDER
        container.innerHTML = `
                    <div class="dashboard-container">
                         <div class="section-header">
                            <h2>Banco Central</h2>
                            <span style="color:#94a3b8; font-size:0.9rem;">Límite Crédito: ${formatCurrency(limit)}</span>
                        </div>

                        <div class="bank-grid">
                            <!-- LEFT: CALCULATOR -->
                            <div class="calculator-card">
                                <h3 style="margin-top:0; color:#facc15; border-bottom:1px solid #334155; padding-bottom:10px; margin-bottom:20px;">💰 Solicitar Financiación</h3>
                                
                                <div class="loan-input-group">
                                    <label>Cantidad a solicitar (€)</label>
                                    <input type="number" id="loan-amount-input" class="loan-input" placeholder="Ej. 50000" min="1000" step="1000">
                                </div>
                                <div class="loan-input-group">
                                    <label>Plazo de Amortización: <span id="loan-years-val" style="color:white; font-weight:bold;">2 años</span></label>
                                    <input type="range" id="loan-years-input" min="1" max="5" value="2" style="width:100%; accent-color:#facc15;">
                                </div>

                                <div class="loan-summary">
                                    <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                        <span>Tipo de Interés</span>
                                        <span style="color:#f87171; font-weight:bold;">12.0% TAE</span>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; font-size:1.1rem; border-top:1px solid #334155; padding-top:5px; margin-top:5px;">
                                        <span>Cuota Mensual</span>
                                        <span id="loan-monthly-preview" style="color:#facc15; font-weight:bold;">0,00 €</span>
                                    </div>
                                </div>

                                <button id="btn-request-loan-dynamic" class="btn-action-primary" style="background:#facc15; color:#0f172a; margin-top:20px;">Solicitar Préstamo</button>
                            </div>

                            <!-- RIGHT: ACTIVE LOANS -->
                            <div>
                                <h3 style="margin-top:0; color:#94a3b8; margin-bottom:20px;">Préstamos Activos (${loans.length})</h3>
                                <div id="active-loans-wrapper">
                                    ${loans.length === 0 ?
                '<p style="color:#64748b; font-style:italic; border:1px dashed #334155; padding:20px; border-radius:8px; text-align:center;">No tienes deudas activas. ¡Buen trabajo!</p>' :
                loans.map(loan => {
                    const progress = ((loan.termMonths - loan.remainingMonths) / loan.termMonths) * 100;
                    return `
                                            <div class="active-loan-card">
                                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                                                    <strong style="color:#fff; font-size:1.1rem;">${loan.type}</strong>
                                                    <span style="background:rgba(239, 68, 68, 0.2); color:#f87171; padding:2px 8px; border-radius:4px; font-size:0.8rem;">-${formatCurrency(loan.remainingBalance)}</span>
                                                </div>
                                                <div style="display:flex; justify-content:space-between; font-size:0.9rem; color:#cbd5e1;">
                                                    <span>Cuota: ${formatCurrency(loan.monthlyPayment)}</span>
                                                    <span>Restan: ${loan.remainingMonths} meses</span>
                                                </div>
                                                <div class="loan-progress">
                                                    <div class="loan-bar" style="width:${progress}%"></div>
                                                </div>
                                                <div class="loan-actions">
                                                    <button class="btn-pay-loan" data-id="${loan.id}" style="background:#ef4444; color:white; border:none; border-radius:4px; padding:5px 10px; cursor:pointer; font-size:0.8rem; margin-top:5px;">Liquidar Total</button>
                                                    <button class="btn-pay-partial" data-id="${loan.id}" style="background:#3b82f6; color:white; border:none; border-radius:4px; padding:5px 10px; cursor:pointer; font-size:0.8rem; margin-top:5px; margin-left:5px;">Amortizar</button>
                                                </div>
                                                <div style="font-size:0.75rem; color:#64748b; margin-top:5px;">Interés Anual: ${(loan.interestRate * 100).toFixed(2)}%</div>
                                            </div>
                                            `;
                }).join('')
            }
                                </div>
                            </div>
                        </div>
                    </div>
                `;

        // EVENTS
        const amountIn = document.getElementById('loan-amount-input');
        const yearsIn = document.getElementById('loan-years-input');
        const yearsVal = document.getElementById('loan-years-val');
        const monthlyPrev = document.getElementById('loan-monthly-preview');
        const btnReq = document.getElementById('btn-request-loan-dynamic');

        const updateCalc = () => {
            const amount = parseFloat(amountIn.value) || 0;
            const years = parseInt(yearsIn.value);
            yearsVal.textContent = `${years} años`;
            if (amount > 0) {
                // Formula copy from Bank.takeLoan logic for preview
                const r = 0.12 / 12;
                const n = years * 12;
                const pmt = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                monthlyPrev.textContent = formatCurrency(pmt);
            } else {
                monthlyPrev.textContent = "0,00 €";
            }
        };

        amountIn.addEventListener('input', updateCalc);
        yearsIn.addEventListener('input', updateCalc);

        btnReq.addEventListener('click', () => {
            const amount = parseFloat(amountIn.value);
            const years = parseInt(yearsIn.value);
            if (!amount || amount <= 0) return UI.showModal('Error', 'Introduce una cantidad válida.', [{ text: 'Cerrar', style: 'secondary', fn: null }]);

            const res = BankModule.takeLoan(amount, years);
            if (res.success) {
                UI.showModal('Solicitud Aprobada', res.message, [{ text: 'Excelente', style: 'success', fn: null }]);
                UI.updateHeader();
                UI.updateDashboard(); // Reflow cash
                UI.updateBank(BankModule);
            } else {
                UI.showModal('Solicitud Denegada', res.message, [{ text: 'Entendido', style: 'danger', fn: null }]);
            }
        });

        container.querySelectorAll('.btn-pay-loan').forEach(btn => {
            btn.onclick = (e) => {
                const id = parseInt(e.target.dataset.id); // Parse ID!
                const res = BankModule.payLoanTotally(id);

                if (res.success) {
                    UI.showModal('Deuda Liquidada', res.message, [{ text: 'Perfecto', style: 'success', fn: null }]);
                    UI.updateHeader();
                    UI.updateDashboard();
                    UI.updateBank(BankModule);
                } else {
                    UI.showModal('Error', res.message, [{ text: 'Cerrar', style: 'secondary', fn: null }]);
                }
            };
        });

        container.querySelectorAll('.btn-pay-partial').forEach(btn => {
            btn.onclick = (e) => {
                const loanId = parseInt(e.target.dataset.id);

                const modalContent = `
                                <p style="margin-bottom:10px;">Introduce la cantidad a amortizar:</p>
                                <input type="number" id="amortize-input-${loanId}" placeholder="Ej: 5000" style="width:100%; padding:10px; border-radius:4px; border:1px solid #334155; background:#1e293b; color:white;">
                            `;

                UI.showModal('Amortizar Préstamo', modalContent, [
                    {
                        text: 'Confirmar Pago',
                        style: 'primary',
                        fn: () => {
                            const input = document.getElementById(`amortize-input-${loanId}`);
                            if (!input) return;
                            const val = parseInt(input.value);

                            if (isNaN(val) || val <= 0) {
                                // Small delay to show error after modal closes, or just alert? 
                                // Alert is safer here to not break flow if modal closes. 
                                // Actually re-opening modal is better but complex.
                                alert("Cantidad inválida.");
                                return;
                            }

                            const res = BankModule.payLoanPartial(loanId, val);
                            if (res.success) {
                                UI.showModal('Amortización Exitosa', res.message, [{ text: 'Genial', style: 'success', fn: null }]);
                                UI.updateBank(BankModule);
                                UI.updateHeader();
                                UI.updateDashboard();
                            } else {
                                UI.showModal('Error', res.message, [{ text: 'Cerrar', style: 'secondary', fn: null }]);
                            }
                        }
                    },
                    { text: 'Cancelar', style: 'secondary', fn: null }
                ]);
            };
        });
    },
    updateRealEstate(REModule) {
        const container = document.getElementById('real-estate-view');
        if (!container) return;

        // DATA
        const properties = REModule.availableProperties;
        const owned = GameState.inventory.realEstate;

        // Stats for Hero
        let totalVal = 0;
        let totalRent = 0;
        let totalEquity = 0;
        let totalMortgagePayment = 0;

        owned.forEach(p => {
            totalVal += p.price;
            totalRent += p.monthlyRent;
        });

        // Calculate Equity and Mortgage Payments
        let mortgageDebt = 0;
        GameState.loans.forEach(l => {
            if (l.type.includes('Hipotecario')) {
                mortgageDebt += l.remainingBalance;
                totalMortgagePayment += l.monthlyPayment;
            }
        });
        totalEquity = totalVal - mortgageDebt;

        // RENDER
        container.innerHTML = `
                    <div class="dashboard-container">
                        <div class="section-header">
                            <h2>Bienes Inmobiliarios</h2>
                            <span style="color:#94a3b8; font-size:0.9rem;">Propiedades: ${owned.length}</span>
                        </div>

                        <!-- HERO STATS -->
                        <div class="re-stats-container" style="display:flex; flex-wrap:wrap; gap:15px; margin-bottom:20px;">
                            <div class="portfolio-stat re-stat-card" style="flex:2; background:#1e293b; padding:15px; border-radius:12px; border:1px solid #334155; text-align:center; min-width: 200px;">
                                <span class="label" style="display:block; color:#94a3b8; font-size:0.85rem; margin-bottom:5px;">Patrimonio Neto</span>
                                <span class="value" style="font-size:1.4rem; font-weight:bold; color:#facc15;">${formatCurrency(totalEquity)}</span>
                            </div>
                             <div class="portfolio-stat re-stat-card" style="flex:1; background:#1e293b; padding:15px; border-radius:12px; border:1px solid #334155; text-align:center; min-width: 140px;">
                                <span class="label" style="display:block; color:#94a3b8; font-size:0.85rem; margin-bottom:5px;">Rentas / mes</span>
                                <span class="value" style="font-size:1.1rem; font-weight:bold; color:#4ade80;">+${formatCurrency(totalRent)}</span>
                            </div>
                            <div class="portfolio-stat re-stat-card" style="flex:1; background:#1e293b; padding:15px; border-radius:12px; border:1px solid #334155; text-align:center; min-width: 140px;">
                                <span class="label" style="display:block; color:#94a3b8; font-size:0.85rem; margin-bottom:5px;">Deudas / mes</span>
                                <span class="value" style="font-size:1.1rem; font-weight:bold; color:#f87171;">-${formatCurrency(totalMortgagePayment)}</span>
                            </div>
                        </div>

                        <!-- MARKET -->
                        <div class="job-section-spacer">
                            <h3 style="color:#cbd5e1; margin-bottom:20px;">🏙️ Mercado Inmobiliario</h3>
                            <div class="market-grid">
                                ${properties.map(prop => {
            const pricePerM2 = prop.price / prop.sizeM2;
            const isGoodDeal = pricePerM2 < prop.zoneAvgPrice;
            const dealText = isGoodDeal ? 'Chollo' : 'Sobreprecio';
            const dealClass = isGoodDeal ? 'good-deal' : 'bad-deal';
            const roi = (prop.monthlyRent * 12) / prop.price;

            return `
                                    <div class="property-card-expert">
                                        <div class="prop-img" style="display:flex; align-items:center; justify-content:center; background:#1e293b; font-size:4rem;">
                                            ${prop.icon || '🏠'}
                                            <span class="deal-badge ${dealClass}">${dealText}</span>
                                        </div>
                                        <div class="prop-content">
                                            <h4 style="margin:0 0 5px 0; color:#fff;">${prop.name}</h4>
                                            <p style="color:#94a3b8; font-size:0.85rem; margin-bottom:10px;">
                                                ${prop.sizeM2}m² | Zona: ${formatCurrency(prop.zoneAvgPrice)}/m²
                                            </p>
                                            <div class="prop-financials">
                                                <div>
                                                    <span class="label">Precio</span>
                                                    <span class="value" style="color:#facc15">${formatCurrency(prop.price)}</span>
                                                </div>
                                                <div>
                                                    <span class="label">Alquiler</span>
                                                    <span class="value" style="color:#4ade80">+${formatCurrency(prop.monthlyRent)}/mes</span>
                                                </div>
                                                <div>
                                                    <span class="label">Entrada (20%)</span>
                                                    <span class="value">${formatCurrency(prop.price * prop.downPaymentPct)}</span>
                                                </div>
                                                <div>
                                                    <span class="label">Rentab.</span>
                                                    <span class="value">${((prop.monthlyRent * 12 / prop.price) * 100).toFixed(1)}%</span>
                                                </div>
                                            </div>
                                            <div style="margin-top:15px; display:flex; gap:10px;">
                                                <button class="btn-buy-prop-dynamic btn-action-primary" data-id="${prop.id}" data-mortgage="true">Comprar (Hipoteca)</button>
                                                <button class="btn-buy-prop-dynamic btn-action-primary" data-id="${prop.id}" data-mortgage="false" style="background:#475569; border:1px solid #94a3b8;">Contado</button>
                                            </div>
                                        </div>
                                    </div>
                                    `;
        }).join('')}
                            </div>
                        </div>

                        <!-- OWNED -->
                        <div class="dashboard-card">
                            <h3 style="margin-top:0; color:#cbd5e1; margin-bottom:15px; border-bottom:1px solid #334155; padding-bottom:10px;">🔑 Mis Propiedades</h3>
                             ${owned.length === 0 ? '<p style="color:#64748b;">No tienes propiedades en cartera.</p>' :
                '<div style="display:grid; gap:10px;">' +
                owned.map(prop => {
                    const purchasePrice = prop.purchasePrice || prop.price; // Fallback
                    const diff = prop.price - purchasePrice;
                    const pct = ((diff / purchasePrice) * 100).toFixed(2);
                    const color = diff >= 0 ? '#4ade80' : '#f87171';
                    const sign = diff >= 0 ? '+' : '';

                    const mortgage = GameState.loans.find(l => l.id === prop.mortgageId);
                    const debtHtml = mortgage
                        ? `<div>Deudas: <span style="color:#f87171">-${formatCurrency(mortgage.monthlyPayment)}/mes</span></div>`
                        : '';

                    return `
                                    <div style="background:#0f172a; padding:15px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                                        <div>
                                            <strong>${prop.name}</strong>
                                            <div style="font-size:0.85rem; color:#94a3b8; margin-top:5px;">
                                                <div>Compra: ${formatCurrency(purchasePrice)} | Actual: ${formatCurrency(prop.price)}</div>
                                                <div style="color:${color}; font-weight:bold;">Revalorización: ${sign}${pct}%</div>
                                                <div>Rentas: <span style="color:#4ade80">+${formatCurrency(prop.monthlyRent)}/mes</span></div>
                                                ${debtHtml}
                                            </div>
                                        </div>
                                        <button class="btn-sell-prop-dynamic" data-id="${prop.id}" style="background:#ef4444; color:white; border:none; padding:5px 15px; border-radius:4px; cursor:pointer;">Vender</button>
                                    </div>
                                `;
                }).join('') +
                '</div>'
            }
                        </div>
                    </div>
                `;

        // BIND EVENTS
        container.querySelectorAll('.btn-buy-prop-dynamic').forEach(btn => {
            btn.onclick = (e) => {
                const id = parseInt(e.target.dataset.id);
                const prop = REModule.availableProperties.find(p => p.id === id);
                if (!prop) return;

                const useMortgage = e.target.dataset.mortgage === 'true';

                if (useMortgage) {
                    const downPayment = prop.price * prop.downPaymentPct;
                    const loanAmount = prop.price - downPayment;
                    const rateAnnual = Bank.INTEREST_RATES.mortgage;
                    const r = rateAnnual / 12;

                    // Options
                    const calcPmt = (years) => {
                        const n = years * 12;
                        return (loanAmount * r) / (1 - Math.pow(1 + r, -n));
                    };

                    const msg = `
                                    <div style="margin-bottom:15px; border-bottom:1px solid #334155; padding-bottom:10px;">
                                        <strong>${prop.name}</strong><br>
                                        Precio: ${formatCurrency(prop.price)}<br>
                                        Entrada (20%): <span style="color:#facc15">${formatCurrency(downPayment)}</span><br>
                                        Préstamo: ${formatCurrency(loanAmount)}<br>
                                        Interés Anual: <span style="color:#f87171">${(rateAnnual * 100).toFixed(2)}%</span>
                                    </div>
                                    <p style="margin-bottom:5px; font-size:0.9rem; color:#94a3b8;">Elige el plazo:</p>
                                `;

                    UI.showModal('Configurar Hipoteca', msg, [
                        { text: `10 Años (${formatCurrency(calcPmt(10))}/mes)`, style: 'primary', fn: () => buy(id, true, 10) },
                        { text: `20 Años (${formatCurrency(calcPmt(20))}/mes)`, style: 'primary', fn: () => buy(id, true, 20) },
                        { text: `30 Años (${formatCurrency(calcPmt(30))}/mes)`, style: 'primary', fn: () => buy(id, true, 30) },
                        { text: 'Cancelar', style: 'secondary', fn: null }
                    ]);

                } else {
                    // Cash Buy
                    const confirmMsg = `¿Adquirir ${prop.name} por ${formatCurrency(prop.price)} al contado?`;
                    UI.confirmModal('Pago al Contado', confirmMsg, () => {
                        buy(id, false, 0);
                    });
                }

                // Helper execution
                const buy = (propId, mortgage, term) => {
                    const res = REModule.buyProperty(propId, mortgage, term);
                    if (res.success) {
                        UI.showModal('¡Operación Exitosa!', res.message, [{ text: 'Genial', style: 'primary', fn: null }]);
                        UI.updateHeader();
                        UI.updateDashboard();
                        UI.updateBank(Bank);
                        UI.updateRealEstate(REModule);
                    } else {
                        UI.showModal('Error', res.message, [{ text: 'Cerrar', style: 'secondary', fn: null }]);
                    }
                };
            };
        });

        container.querySelectorAll('.btn-sell-prop-dynamic').forEach(btn => {
            btn.onclick = (e) => {
                const id = parseInt(e.target.dataset.id);
                const prop = GameState.inventory.realEstate.find(p => p.id === id);
                if (confirm(`¿Vender ${prop ? prop.name : 'propiedad'}?`)) {
                    const res = REModule.sellProperty(id);
                    alert(res.message);
                    if (res.success) {
                        UI.updateHeader();
                        UI.updateDashboard();
                        UI.updateBank(Bank);
                        UI.updateRealEstate(REModule);
                    }
                }
            };
        });
    },

    openCompanyWizard() {
        const modal = document.getElementById('company-wizard-modal');
        const close = document.getElementById('close-wizard');

        // Steps
        const step1 = document.getElementById('wizard-step-1');
        const step2 = document.getElementById('wizard-step-2');
        const dot1 = document.getElementById('wiz-step-ind-1');
        const dot2 = document.getElementById('wiz-step-ind-2');
        const bar2 = dot2.querySelector('div');

        // Buttons
        const btnNext = document.getElementById('btn-wiz-next');
        const btnBack = document.getElementById('btn-wiz-back');

        // Inputs & Display
        const nameInput = document.getElementById('wiz-name');
        const typeGrid = document.getElementById('wiz-types-grid');
        const locGrid = document.getElementById('wiz-loc-grid');
        const summaryCash = document.getElementById('wiz-current-cash');
        const summarySetup = document.getElementById('summ-setup-cost');
        const summaryRent = document.getElementById('summ-rent-cost');
        const summaryTotal = document.getElementById('wiz-total-cost');
        const errorMsg = document.getElementById('wiz-error-msg');

        // State
        let currentStep = 1;
        let state = {
            name: '',
            typeId: null,
            locId: null
        };

        // Helper: Update Summary Sidebar
        const updateSummary = () => {
            summaryCash.textContent = formatCurrency(GameState.cash);

            let setupCost = 0;
            let rentCost = 0;

            if (state.typeId) {
                const type = CompanyModule.businessTypes[state.typeId];
                setupCost = type.cost;

                // Calculate Rent if Location Selected
                if (state.locId) {
                    const loc = CompanyModule.locations[state.locId];
                    rentCost = type.baseRent * loc.rentMult;
                } else {
                    // Show base rent range or just base?
                    // Let's show base rent as "Desde"
                    // For simplicity, 0 until selected.
                }
            }

            summarySetup.textContent = formatCurrency(setupCost);
            summaryRent.textContent = rentCost > 0 ? `${formatCurrency(rentCost)}/mes` : '---';

            // Total Requirement for FOUNDING is Setup Cost + (Optional: First Month Rent?)
            // Let's assume you need Setup + 1 Month Rent to start safely.
            const totalRequired = setupCost + rentCost;

            summaryTotal.textContent = formatCurrency(totalRequired);

            if (GameState.cash < totalRequired) {
                summaryTotal.style.color = '#f87171'; // Red
                errorMsg.style.display = 'block';
                btnNext.disabled = true;
                btnNext.style.opacity = '0.5';
                btnNext.style.cursor = 'not-allowed';
            } else {
                summaryTotal.style.color = '#f8fafc';
                errorMsg.style.display = 'none';
                btnNext.disabled = false;
                btnNext.style.opacity = '1';
                btnNext.style.cursor = 'pointer';
            }
        };

        // RENDER STEP 1: BUSINESS TYPES
        typeGrid.innerHTML = '';

        // Count existing cafes
        const cafeCount = (GameState.ownedCompanies || []).filter(c => c.typeId === 'cafe').length;

        for (const [key, val] of Object.entries(CompanyModule.businessTypes)) {
            const volatility = val.volatility || 0.1;
            const riskTag = volatility > 0.3 ? '<span class="biz-tag tag-high-risk">Alto Riesgo</span>' : '<span class="biz-tag tag-low-risk">Estable</span>';
            const icon = val.icon || '🏢';

            // Check Lock Condition
            const isLocked = (key !== 'cafe' && cafeCount < 2);

            const card = document.createElement('div');
            card.className = `biz-model-card ${isLocked ? 'locked' : ''}`;

            if (isLocked) {
                card.style.opacity = '0.5';
                card.style.cursor = 'not-allowed';
                card.style.filter = 'grayscale(1)';
                card.innerHTML = `
                            <div>
                                <div class="biz-icon">🔒</div>
                                <div class="biz-title">${val.name}</div>
                                <span class="biz-tag" style="background:#334155; color:#94a3b8;">Bloqueado</span>
                            </div>
                            <div style="margin-top:10px; font-size:0.8rem; color:#fca5a5;">
                                ⚠️ Requiere 2 Cafeterías<br>
                                (Tienes: ${cafeCount})
                            </div>
                        `;
            } else {
                card.innerHTML = `
                            <div>
                                <div class="biz-icon">${icon}</div>
                                <div class="biz-title">${val.name}</div>
                                ${riskTag}
                            </div>
                            <div>
                                <div class="biz-stat-row"><span>Inversión</span> <span style="color:white">${formatCurrency(val.cost)}</span></div>
                                <div class="biz-stat-row"><span>Alquiler Base</span> <span style="color:white">${formatCurrency(val.baseRent)}</span></div>
                                <div class="biz-stat-row"><span>Demanda</span> <span style="color:white">${val.baseDemand}/mes</span></div>
                            </div>
                        `;
                card.onclick = () => {
                    typeGrid.querySelectorAll('.biz-model-card').forEach(el => el.classList.remove('selected'));
                    card.classList.add('selected');
                    state.typeId = key;
                    updateSummary();
                };
            }
            typeGrid.appendChild(card);
        }

        // RENDER STEP 2: LOCATIONS
        locGrid.innerHTML = '';

        // Count total businesses (active company + automated companies)
        const totalBusinesses = (GameState.company ? 1 : 0) + (GameState.ownedCompanies ? GameState.ownedCompanies.length : 0);
        const premiumLocationsUnlocked = totalBusinesses >= 2;

        for (const [key, val] of Object.entries(CompanyModule.locations)) {
            const trafficPct = Math.min(100, val.trafficMult * 80); // Visual bar

            // PRE-CALCULATE DYNAMIC PRICE IF TYPE SELECTED
            let priceDisplay = `x${val.rentMult}`;
            let priceClass = '';

            if (state.typeId) {
                const base = CompanyModule.businessTypes[state.typeId].baseRent;
                const final = base * val.rentMult;
                priceDisplay = formatCurrency(final) + '/mes';
                priceClass = 'color: #fca5a5; font-weight:bold;'; // Light red for cost
            }

            // Check if this location is locked
            const isPremiumLocation = (key === 'downtown' || key === 'business_district');
            const isLocked = isPremiumLocation && !premiumLocationsUnlocked;

            const card = document.createElement('div');
            card.className = 'loc-tier-card';

            // Add locked styling if needed
            if (isLocked) {
                card.style.opacity = '0.5';
                card.style.cursor = 'not-allowed';
                card.style.border = '1px solid #475569';
            }

            // Re-render when type changes? ideally yes. 
            // But openCompanyWizard renders once.
            // We need to re-render locations if we want the price on the card to update?
            // OR we just rely on summary.
            // User requested: "deberia actualizarse el precio del almacen segun se seleccione una u otra"
            // This creates a dependency: Type -> Location Cost.
            // Since Step 1 comes before Step 2, we can re-render Step 2 when coming from Step 1?
            // Let's implement that in 'goNext'.

            card.innerHTML = `
                        <div>
                            <div style="font-size:1.8rem; margin-bottom:10px;">${isLocked ? '🔒' : '📍'}</div>
                            <div class="biz-title">${val.name}${isLocked ? ' 🔒' : ''}</div>
                            <div style="font-size:0.8rem; color:#94a3b8; line-height:1.4;">
                                ${isLocked ?
                    '<span style="color:#fbbf24;">Requiere 2+ negocios para desbloquear</span>' :
                    'Ideal para negocios que dependen del volumen de gente.'}
                            </div>
                        </div>
                        <div style="margin-top:15px;">
                            <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:#cbd5e1;">
                                <span>Tráfico</span>
                                <span>x${val.trafficMult}</span>
                            </div>
                            <div class="traffic-viz"><div class="traffic-fill" style="width:${trafficPct}%"></div></div>
                            <div class="biz-stat-row" style="margin-top:5px;">
                                <span>Coste Alquiler</span> 
                                <span class="loc-price-tag" data-mult="${val.rentMult}" style="${priceClass}">${priceDisplay}</span>
                            </div>
                        </div>
                    `;

            card.onclick = () => {
                if (isLocked) {
                    UI.showModal(
                        '🔒 Ubicación Premium Bloqueada',
                        `<div style="text-align:center;">
                                    <p style="margin-bottom:15px;">Las ubicaciones <strong>${val.name}</strong> están reservadas para empresarios experimentados.</p>
                                    <div style="background:rgba(251, 191, 36, 0.1); border:1px solid #fbbf24; border-radius:8px; padding:15px; margin:15px 0;">
                                        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                                            <span>Requisito:</span>
                                            <strong style="color:#fbbf24;">2+ Negocios</strong>
                                        </div>
                                        <div style="display:flex; justify-content:space-between;">
                                            <span>Negocios Actuales:</span>
                                            <strong style="color:#f87171;">${totalBusinesses}</strong>
                                        </div>
                                    </div>
                                    <p style="color:#94a3b8; font-size:0.9rem; margin-top:15px;">
                                        💡 Funda y automatiza tu primera empresa para desbloquear ubicaciones premium.
                                    </p>
                                </div>`,
                        [{ text: 'Entendido', style: 'secondary', fn: null }]
                    );
                    return;
                }

                locGrid.querySelectorAll('.loc-tier-card').forEach(el => el.classList.remove('selected'));
                card.classList.add('selected');
                state.locId = key;
                updateSummary();
            };
            locGrid.appendChild(card);
        }

        // NAVIGATION LOGIC
        const showStep = (step) => {
            currentStep = step;

            if (step === 1) {
                step1.style.display = 'block';
                step2.style.display = 'none';
                bar2.style.width = '0%';
                dot2.classList.remove('active');
                btnBack.style.display = 'none';
                btnNext.textContent = 'Siguiente ➡️';
                btnNext.onclick = goNext;

                // Mobile buttons
                btnBackMobile.style.display = 'none';
                btnNextMobile.textContent = 'Siguiente ➡️';
                btnNextMobile.onclick = goNext;
            } else if (step === 2) {
                step1.style.display = 'none';
                step2.style.display = 'block';
                bar2.style.width = '100%';
                dot2.classList.add('active');
                btnBack.style.display = 'block';
                btnNext.textContent = '🌵 Fundar Empresa';
                btnNext.onclick = finishWizard;

                // Mobile buttons      
                btnBackMobile.style.display = 'block';
                btnNextMobile.textContent = '🌵 Fundar Empresa';
                btnNextMobile.onclick = finishWizard;

                // UPDATE DYNAMIC RENT ON CARDS WHEN ENTERING STEP 2
                if (state.typeId) {
                    const base = CompanyModule.businessTypes[state.typeId].baseRent;
                    locGrid.querySelectorAll('.loc-price-tag').forEach(tag => {
                        const mult = parseFloat(tag.dataset.mult);
                        tag.textContent = formatCurrency(base * mult) + '/mes';
                        tag.style.color = '#fca5a5';
                        tag.style.fontWeight = 'bold';
                    });
                }
            }
        };

        const goNext = () => {
            state.name = nameInput.value;
            if (!state.name) return alert('Por favor, indica un nombre para tu empresa.');
            if (!state.typeId) return alert('Debes seleccionar un modelo de negocio.');
            showStep(2);
        };

        btnBack.onclick = () => showStep(1);

        // CONNECT MOBILE BUTTONS TO SAME LOGIC
        const btnBackMobile = document.getElementById('btn-wiz-back-mobile');
        const btnNextMobile = document.getElementById('btn-wiz-next-mobile');

        btnBackMobile.onclick = () => showStep(1);
        btnNextMobile.onclick = goNext; // Will be reassigned in showStep(2)

        const finishWizard = () => {
            if (!state.locId) return alert('Selecciona una ubicación para tu sede.');

            // Execute Creation
            const res = CompanyModule.createCompany(state.name, state.typeId, state.locId);

            if (res.success) {
                modal.style.display = 'none';
                alert(`¡Enhorabuena! has fundado ${state.name}.\n\nRevisa tu panel de control.`);
                UI.updateHeader();
                UI.updateJob(JobSystem);
                UI.updateDashboard();
                setTimeout(() => {
                    UI.checkContextualTutorial('company_summary');
                }, 500);
            } else {
                alert(res.message);
            }
        };

        // INITIALIZE
        nameInput.value = '';
        state = { name: '', typeId: null, locId: null };
        updateSummary();
        showStep(1);
        modal.style.display = 'block';

        close.onclick = () => modal.style.display = 'none';
        window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; }
    },

    closeCompanyWizard() {
        document.getElementById('company-wizard-modal').style.display = 'none';
    },

    // Modified to call Company Tutorial upon success
    finishCompanyWizard() {
        // Logic moved here or kept in event listener?
        // I'll leave the event listener logic but invoke tutorial there.
    },

    render() {
        this.updateHeader();
        this.updateDashboard();
        // Only update active view
        const activeViewId = document.querySelector('.view.active')?.id;
        if (activeViewId === 'market-view') this.updateMarket();
        else if (activeViewId === 'bank-view') this.updateBank(Bank);
        else if (activeViewId === 'real-estate-view') this.updateRealEstate(RealEstate);
        else if (activeViewId === 'job-view') this.updateJob(JobSystem);
        else if (activeViewId === 'education-view') this.updateEducation(EducationModule);
        // Dashboard is always updated by updateDashboard()
    },

    showView(targetView) {
        console.log('DEBUG: showView called with', targetView);
        // 1. Update View Visibility
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
            if (view.id === `${targetView}-view`) {
                view.classList.add('active');

                // Trigger Data Updates
                if (targetView === 'market') UI.updateMarket();
                else if (targetView === 'bank') UI.updateBank(Bank);
                else if (targetView === 'real-estate') UI.updateRealEstate(RealEstate);
                else if (targetView === 'job') UI.updateJob(JobSystem);
                else if (targetView === 'education') UI.updateEducation(EducationModule);
                else if (targetView === 'education') UI.updateEducation(EducationModule);
                else if (targetView === 'lifestyle') {
                    if (!GameState.expensesUnlocked) {
                        alert("🔒 Gastos bloqueados: Aún vives con tus padres.");
                        return; // Stop navigation
                    }
                    UI.updateLifestyle(LifestyleModule);
                }
                else if (targetView === 'dashboard') UI.updateDashboard();

                // Trigger Tutorials
                UI.checkContextualTutorial(targetView);
            }
        });

        // 2. Update Desktop Nav State
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === targetView);
        });

        // 3. Update Mobile Bottom Nav State
        document.querySelectorAll('.b-nav-item').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === targetView);
        });
    },

    // TUTORIAL MODULE
    startInitialTutorial() {
        const steps = [
            {
                title: '👋 Bienvenido/a',
                msg: `Hola <strong>${GameState.playerName}</strong>.<br><br>Este es un juego de <strong>simulación real</strong> donde comienzas con 16 años recién acabada la ESO.<br><br>Tus decisiones marcarán tu vida. Tu objetivo es darle la <strong>mejor vida posible</strong> a tu personaje.`
            },
            {
                title: '🎓 Primer Paso: Formación',
                msg: 'Ve a la pestaña <strong>FORMACIÓN</strong> para elegir tu camino educativo.<br><br>Es momento de decidir tu futuro.'
            }
        ];
        UI.runTutorialSequence(steps, () => {
            GameState.tutorialState.initial = true;
            PersistenceModule.saveGame();
        });
    },

    checkContextualTutorial(view) {
        if (!GameState.tutorialState) GameState.tutorialState = {}; // Safety init for old saves
        if (GameState.tutorialState[view]) return; // Already seen

        // Special Block for Lifestyle during forced sequence
        if (view === 'lifestyle' && GameState.tutorialState.forceHousing) return;

        let steps = [];
        if (view === 'education') {
            steps = [
                { title: '🎓 Formación', msg: 'Acabas de terminar la ESO. Es hora de decidir:<br><br>¿<strong>FP</strong> o <strong>BACHILLERATO</strong>?' },
                { title: '💼 Siguiente Paso', msg: 'Una vez elijas tu camino, ve a la pestaña <strong>EMPLEO</strong> para buscar trabajo.' }
            ];
        } else if (view === 'job') {
            if (GameState.jobTitle === 'Desempleado' || GameState.salary === 0) {
                steps = [
                    { title: '💼 Empleo', msg: 'Sin titulación las opciones son <strong>pocas</strong>.<br><br>Pero necesitas ingresos para pagar tus estudios.' },
                    { title: '⚡ Trabajos Temporales', msg: 'Mientras estudias, trabaja en <strong>TRABAJOS TEMPORALES</strong>.<br><br>Son flexibles y te darán el dinero necesario para vivir.' },
                    { title: '⏭️ Siguiente Mes', msg: 'Una vez elijas un trabajo temporal, dale al botón <strong>SIGUIENTE MES</strong> (arriba a la derecha).<br><br>El juego funciona por turnos mensuales.' }
                ];
            } else {
                steps = [
                    { title: '💼 Trabajo', msg: 'Aquí gestionas tu carrera profesional. Ganas experiencia mes a mes.' },
                    { title: '🚀 Ascensos', msg: 'Cuando cumplas los requisitos, solicita un ascenso para aumentar tus ingresos.' }
                ];
            }
        } else if (view === 'market') {
            steps = [
                { title: '📈 La Bolsa', msg: 'Compra barato, vende caro. Las acciones cambian de precio cada mes según la tendencia del mercado.' },
                { title: '⚠️ Riesgo', msg: 'Puedes ganar mucho o perderlo todo. Diversifica tu cartera.' }
            ];
        } else if (view === 'real-estate') {
            steps = [
                { title: '🏡 Inmobiliaria', msg: 'Los inmuebles dan rentas mensuales (alquiler) y se revalorizan con el tiempo.' },
                { title: '🏦 Hipotecas', msg: 'Puedes comprar dando solo el 20% de entrada y pidiendo una hipoteca al banco. ¡Apalancamiento!' }
            ];
        } else if (view === 'bank') {
            steps = [
                { title: '🏦 Banco', msg: 'Aquí gestiones tu deuda. Puedes pedir préstamos personales si necesitas efectivo urgente (pero intereses altos).' },
                { title: '📉 Amortizar', msg: 'Si tienes deudas, intenta pagarlas cuanto antes para reducir los intereses mensuales.' }
            ];
        } else if (view === 'company_summary') {
            steps = [
                { title: '📊 Resumen Empresa', msg: 'Tu cuadro de mando. Vigila la <strong>Caja</strong> (efectivo disponible) y el <strong>Beneficio Mensual</strong>.' },
                { title: '💡 Automatizar', msg: 'Aquí podrás contratar gerentes para que la empresa funcione sola en el futuro. Después, visita la pestaña <strong>Finanzas</strong> para asignarte un sueldo.' }
            ];
        } else if (view === 'company_product') {
            steps = [
                { title: '📦 Producto', msg: 'Define la calidad y el precio. Si subes mucho el precio sin calidad, los clientes se irán.' },
                { title: '🧠 I+D', msg: 'Invierte en mejorar el producto para poder cobrar más.' }
            ];
        } else if (view === 'company_marketing') {
            steps = [
                { title: '📣 Marketing', msg: 'La publicidad trae clientes. Ajusta el presupuesto según tu capacidad de producción.' }
            ];
        } else if (view === 'lifestyle') {
            steps = [
                { title: '💸 Estilo de Vida', msg: 'Tus gastos fijos dependen de cómo vives (casa, comida, transporte...).' },
                { title: '📉 Ahorro vs Lujos', msg: 'Para ahorrar, mantén tus gastos bajos. Pero ojo, vivir en la miseria cansa. Podrás mejorar tu nivel de vida poco a poco.' },
                { title: '🔒 Progresión', msg: 'Solo verás la siguiente mejora disponible. No puedes comprar un Ferrari si vas en autobús.' }
            ];
        } else if (view === 'company_staff') {
            steps = [
                { title: '👥 Personal', msg: 'Tus empleados determinan la eficiencia y calidad. Contrata con cuidado.' },
                { title: '⚡ Productividad', msg: 'Despide a los vagos y mantén a los talentos. Un buen equipo vale oro.' }
            ];
        } else if (view === 'company_finance') {
            steps = [
                { title: '📉 Finanzas', msg: 'Aquí verás el desglose de tus ingresos y gastos. Úsalo para detectar fugas de dinero.' },
                { title: '💰 Salario CEO', msg: '¡No trabajes gratis! Asígnate un sueldo mensual en el panel de abajo para recibir ingresos personales.' }
            ];
        }

        if (steps.length > 0) {
            GameState.tutorialState[view] = true;
            PersistenceModule.saveGame();
            setTimeout(() => UI.runTutorialSequence(steps), 500);
        }
    },

    startCompanyTutorial() {
        if (!GameState.tutorialState) GameState.tutorialState = {};
        if (GameState.tutorialState.company) return;

        const steps = [
            { title: '🏢 Eres el Jefe', msg: 'Has fundado tu empresa. Ahora tú controlas el Precio, el Marketing y la Calidad.' },
            { title: '⚙️ Gestión', msg: 'Usa las pestañas <strong>Producto</strong> y <strong>Marketing</strong> para atraer clientes. Si el precio es alto y la calidad baja, no venderás nada.' },
            { title: '💵 Finanzas', msg: '¡Cuidado con la caja! Si te quedas sin efectivo, quebrarás. Retira beneficios solo cuando la empresa sea estable.' }
        ];

        GameState.tutorialState.company = true;
        PersistenceModule.saveGame();
        UI.runTutorialSequence(steps);
    },

    runTutorialSequence(steps, onComplete) {
        let currentStep = 0;
        const showStep = () => {
            if (currentStep >= steps.length) {
                if (onComplete) onComplete();
                return;
            }
            const s = steps[currentStep];
            UI.showModal(s.title, `<p>${s.msg}</p>`, [
                {
                    text: currentStep === steps.length - 1 ? 'Entendido' : 'Siguiente',
                    style: 'primary',
                    fn: () => {
                        currentStep++;
                        setTimeout(showStep, 200);
                    }
                }
            ]);
        };
        showStep();
    },


    playCoinSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            // Coin "Ding" Effect
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.1);

            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } catch (e) {
            console.error('Audio play failed', e);
        }
    },

    triggerConfetti() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '99999';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#f472b6', '#38bdf8', '#4ade80', '#facc15', '#fbbf24'];

        for (let i = 0; i < 150; i++) {
            particles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                vx: (Math.random() - 0.5) * 15,
                vy: (Math.random() - 1) * 15,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 100
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let active = false;

            particles.forEach(p => {
                if (p.life > 0) {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.5; // Gravity
                    p.life--;
                    active = true;

                    ctx.fillStyle = p.color;
                    ctx.fillRect(p.x, p.y, p.size, p.size);
                }
            });

            if (active) requestAnimationFrame(animate);
            else canvas.remove();
        }

        animate();
    },

    showTurnFeedback(netIncome) {
        if (netIncome === 0) return;

        const isPositive = netIncome > 0;
        const text = isPositive ? `+${formatCurrency(netIncome)}` : formatCurrency(netIncome);
        const color = isPositive ? '#4ade80' : '#f87171';

        const el = document.createElement('div');
        el.textContent = text;
        el.style.position = 'fixed';
        el.style.left = '50%';
        el.style.top = '50%';
        el.style.transform = 'translate(-50%, -50%)';
        el.style.fontSize = '3rem';
        el.style.fontWeight = 'bold';
        el.style.color = color;
        el.style.textShadow = '0 4px 10px rgba(0,0,0,0.5)';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '9999';
        el.style.animation = 'floatUpFade 1.5s ease-out forwards';

        document.body.appendChild(el);

        if (isPositive) this.playCoinSound();

        setTimeout(() => el.remove(), 1500);
    },

    showToast(title, message, type = 'info') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container); // Append gracefully
        }

        const toast = document.createElement('div');
        toast.className = `toast-card ${type}`;
        toast.innerHTML = `
                    <strong>${title}</strong>
                    <p>${message}</p>
                `;

        container.appendChild(toast);

        // Auto Remove
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    updateLifestyle(LifestyleModule) {
        const container = document.getElementById('lifestyle-view');
        if (!container) return;

        if (!GameState.expensesUnlocked) {
            container.innerHTML = `
                        <div class="empty-state">
                            <h3>Aún no eres independiente</h3>
                            <p>Esta pestaña se desbloqueará cuando te mudes de casa de tus padres.</p>
                        </div>
                    `;
            return;
        }

        const current = GameState.lifestyle;
        let totalCost = LifestyleModule.calculateTotal();

        // HERO
        const heroHTML = `
                    <div class="edu-hero" style="background:linear-gradient(135deg, #ec4899, #db2777);">
                        <div class="edu-icon">💸</div>
                        <div>
                            <h2 style="margin:0; font-size:1.5rem;">Estilo de Vida</h2>
                            <p style="color:#fbcfe8; margin:5px 0;">Gastos Mensuales: <strong>${formatCurrency(totalCost)}</strong></p>
                            <p style="font-size:0.9rem; opacity:0.8;">Tu nivel de vida define tus gastos fijos.</p>
                        </div>
                    </div>
                    `;

        // CATEGORIES
        const categoriesHTML = Object.keys(LifestyleModule.categories).map(catKey => {
            const cat = LifestyleModule.categories[catKey];
            const selectedId = current ? current[catKey] : null;

            // Find current index
            const currentIndex = cat.items.findIndex(i => i.id === selectedId);
            const effectiveIndex = currentIndex === -1 ? 0 : currentIndex;

            // Filter items: Show all up to current + 1 
            // UNLESS forced tutorial requires sofa, then ensure sofa is visible
            let visibleItems = cat.items.filter((item, index) => index <= effectiveIndex + 1);

            if (catKey === 'housing' && GameState.tutorialState.forceHousing) {
                const sofaItem = cat.items.find(i => i.id === 'sofa');
                if (sofaItem && !visibleItems.includes(sofaItem)) {
                    visibleItems.push(sofaItem); // Force sofa visibility
                    visibleItems.sort((a, b) => a.cost - b.cost); // Re-sort by cost usually
                }
            }

            const itemsHTML = visibleItems.map(item => {
                const isSelected = item.id === selectedId;
                let cardClasses = `course-card-new lifestyle-card ${isSelected ? 'selected' : ''}`;
                let cardStyle = `cursor:pointer; border-color:${isSelected ? '#ec4899' : '#334155'}; background:${isSelected ? 'rgba(236, 72, 153, 0.1)' : '#1e293b'}`;
                let isDisabled = false;

                // Forced housing logic & Permanent blocks
                if (item.id === 'parents') {
                    isDisabled = true;
                    cardStyle += '; opacity:0.5; cursor:not-allowed;';
                }
                else if (GameState.tutorialState.forceHousing && item.id !== 'sofa') {
                    isDisabled = true;
                    cardStyle += '; opacity:0.5; cursor:not-allowed;';
                }

                if (item.id === 'sofa' && GameState.tutorialState.forceHousing) {
                    cardClasses += ' tutorial-highlight';
                }

                return `
                            <div class="${cardClasses}" style="${cardStyle}" data-cat="${catKey}" data-id="${item.id}" ${isDisabled ? 'data-disabled="true"' : ''}>
                                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                    <h4 style="margin:0; color:${isSelected ? '#ec4899' : '#fff'}">${item.name}</h4>
                                    <span style="font-weight:bold;">${formatCurrency(item.cost)}</span>
                                </div>
                                <p style="font-size:0.8rem; color:#94a3b8; margin:0;">${item.desc}</p>
                            </div>
                            `;
            }).join('');

            return `
                        <div style="margin-bottom:25px;">
                            <h3 style="color:#cbd5e1; border-bottom:1px solid #334155; padding-bottom:5px; margin-bottom:15px;">${cat.label}</h3>
                            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:15px;">
                                ${itemsHTML}
                            </div>
                        </div>
                        `;
        }).join('');

        container.innerHTML = `
                        <div class="dashboard-container">
                            ${heroHTML}
                            <div style="margin-top:20px;">
                                ${categoriesHTML}
                            </div>
                        </div>
                    `;

        // EVENTS
        container.querySelectorAll('.lifestyle-card').forEach(card => {
            card.onclick = () => {
                const cat = card.dataset.cat;
                const id = card.dataset.id;

                // If disabled by tutorial, prevent action
                if (card.dataset.disabled === 'true') {
                    UI.showToast('¡Atención!', 'Debes elegir "Vivir en el sofá" primero para continuar el tutorial.', 'warning');
                    return;
                }

                if (current[cat] === id) return; // No change

                const item = LifestyleModule.getItem(cat, id);

                // Calc upfront
                let upfront = 0;
                let upfrontLabel = '';
                if (item.deposit) {
                    upfront += item.deposit;
                    upfrontLabel = `Fianza: ${formatCurrency(item.deposit)}`;
                }
                if (item.purchaseCost) {
                    upfront += item.purchaseCost;
                    upfrontLabel = `Compra: ${formatCurrency(item.purchaseCost)}`;
                }

                const costMsg = upfront > 0 ? `\n\n❗ Requiere PAGO INICIAL: ${formatCurrency(upfront)} (${upfrontLabel})` : '';

                UI.confirmModal('Cambiar Estilo de Vida', `¿Cambiar ${LifestyleModule.categories[cat].label} a:\n\n${item.name}\nCoste: ${formatCurrency(item.cost)}/mes?${costMsg}`, () => {
                    const res = LifestyleModule.setOption(cat, id);
                    if (res.success) {
                        // Tutorial Completion Logic (Moved here)
                        if (GameState.tutorialState.forceHousing && id === 'sofa') {
                            GameState.tutorialState.forceHousing = false;
                            GameState.expensesUnlocked = true;
                            UI.showToast('¡Tutorial Completado!', 'Ahora puedes gestionar tus gastos libremente.', 'success');
                            setTimeout(() => UI.checkContextualTutorial('lifestyle'), 1000);
                        }

                        UI.updateLifestyle(LifestyleModule);
                        UI.updateHeader();
                        UI.updateDashboard(); // Added missing update
                        UI.playCoinSound(); // Added missing sound
                        UI.showToast('Estilo de Vida Actualizado', res.message, 'success'); // Better feedback
                    } else {
                        UI.showToast('Error', res.message, 'error');
                    }
                });
            };
        });
    },

    updateEducation(EduModule) {
        const container = document.getElementById('education-view');
        if (!container) return;

        // DATA
        const courses = EduModule.courses;
        const myEdu = GameState.education;
        const current = GameState.currentCourse;

        // HERO CONTENT
        let heroHTML = '';
        if (current) {
            const progress = ((current.duration - current.remainingMonths) / current.duration) * 100;
            heroHTML = `
                    <div class="edu-hero">
                        <div class="edu-icon">📚</div>
                        <div class="edu-progress-container">
                            <h2 style="margin:0; font-size:1.5rem;">Estudiando: ${current.name}</h2>
                            <p style="color:#e2e8f0; margin:5px 0;">Tiempo Restante: ${current.remainingMonths} meses</p>
                            <div class="edu-bar-bg">
                                <div class="edu-bar-fill" style="width:${progress}%"></div>
                            </div>
                        </div>
                    </div>
                    `;
        } else {
            const highestId = myEdu[myEdu.length - 1];
            const highest = highestId ? UI.getLabel(highestId) : 'Sin Estudios';
            heroHTML = `
                    <div class="edu-hero" style="background:linear-gradient(135deg, #3b82f6, #2563eb);">
                        <div class="edu-icon">🎓</div>
                        <div>
                            <h2 style="margin:0; font-size:1.5rem;">Formación Actual</h2>
                            <p style="color:#e2e8f0; margin:5px 0;">Máximo Grado: <strong>${highest}</strong></p>
                            <p style="font-size:0.9rem; opacity:0.8;">Inscríbete en un curso para mejorar tus perspectivas laborales.</p>
                        </div>
                    </div>
                    `;
        }

        // GRID CONTENT
        const available = [];
        const locked = [];

        courses.forEach(course => {
            const isCompleted = myEdu.includes(course.id);
            const isStudying = current && current.id === course.id;

            // Prereqs Check
            let hasReq = true;
            if (course.required && course.required.length > 0) {
                const meetsOne = course.required.some(r => myEdu.includes(r));
                if (!meetsOne) hasReq = false;
            }

            // Categorize
            if (isCompleted || isStudying || hasReq) {
                available.push(course);
            } else {
                locked.push(course);
            }
        });

        // Helper to render card
        const renderCourseCard = (course, isLocked = false) => {
            const isCompleted = myEdu.includes(course.id);
            const isStudying = current && current.id === course.id;
            let actionBtn = '';
            let statusBadge = '';

            // Logic Checks (Recalculate or pass down? Recalc for display text)
            let missingReqText = '';
            let hasReq = true;
            if (course.required && course.required.length > 0) {
                const meetsOne = course.required.some(r => myEdu.includes(r));
                if (!meetsOne) {
                    hasReq = false;
                    const reqNames = course.required.map(mid => {
                        const m = courses.find(c => c.id === mid);
                        return m ? m.name : mid;
                    }).join(' o ');
                    missingReqText = `Req: ${reqNames}`;
                }
            }

            // Age Check
            const ageOk = !course.minAge || GameState.age >= course.minAge;
            const ageText = !ageOk ? `Min: ${course.minAge} años` : '';
            const hasFunds = GameState.cash >= (course.cost || 0);

            if (isCompleted) {
                statusBadge = '<span style="background:rgba(245, 158, 11, 0.2); color:#f59e0b; padding:2px 8px; border-radius:4px; font-size:0.8rem; border:1px solid #f59e0b;">Completado</span>';
            } else if (isStudying) {
                statusBadge = '<span style="background:rgba(56, 189, 248, 0.2); color:#38bdf8; padding:2px 8px; border-radius:4px; font-size:0.8rem; border:1px solid #38bdf8;">En Curso</span>';
            } else if (!hasReq) {
                statusBadge = '<span style="background:rgba(239, 68, 68, 0.2); color:#ef4444; padding:2px 8px; border-radius:4px; font-size:0.8rem; border:1px solid #ef4444;">Bloqueado</span>';
            }

            if (!isCompleted && !isStudying) {
                if (!hasReq) {
                    actionBtn = `<button class="btn-apply-small" disabled style="opacity:0.5; cursor:not-allowed;">Bloqueado</button>`;
                } else if (!ageOk) {
                    actionBtn = `<button class="btn-apply-small" disabled style="opacity:0.5; cursor:not-allowed;">Edad insuficiente</button>`;
                } else if (!hasFunds && course.cost > 0) {
                    actionBtn = `<button class="btn-apply-small" disabled style="opacity:0.5; cursor:not-allowed;">Sin Fondos</button>`;
                } else {
                    actionBtn = `<button class="btn-apply-small btn-course-start" data-id="${course.id}">Matricularse</button>`;
                }
            }

            const card = document.createElement('div');
            card.className = 'course-card-new'; // Existing class
            if (isLocked) {
                card.style.opacity = '0.7';
                card.style.borderColor = '#475569';
            }

            card.innerHTML = `
                        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                            <h4 style="margin:0; ${isLocked ? 'color:#cbd5e1' : 'color:#facc15'}">${course.name}</h4>
                            ${statusBadge}
                        </div>
                        <p style="color:#94a3b8; font-size:0.85rem; margin-bottom:10px;">${course.desc}</p>
                        <div style="display:flex; flex-wrap:wrap; gap:5px; margin-bottom:10px;">
                            <span class="tag">⏱ ${course.duration} meses</span>
                            ${course.cost > 0 ? `<span class="tag">💰 ${formatCurrency(course.cost)}</span>` : '<span class="tag">Gratis</span>'}
                            ${missingReqText ? `<span class="tag" style="background:#450a0a; color:#fca5a5; border-color:#7f1d1d;">🔒 ${missingReqText}</span>` : ''}
                            ${ageText ? `<span class="tag" style="background:#450a0a; color:#fca5a5; border-color:#7f1d1d;">🔞 ${ageText}</span>` : ''}
                        </div>
                        ${actionBtn}
                    `;

            const btn = card.querySelector('.btn-course-start');
            if (btn) {
                btn.onclick = () => {
                    const res = EduModule.startCourse(course.id);
                    if (res.success) {
                        UI.showModal('¡Matriculado!', res.message, [{ text: 'A estudiar', style: 'success', fn: () => UI.updateEducation(EduModule) }]);
                        UI.updateHeader();
                        UI.updateDashboard();
                    } else {
                        alert(res.message);
                    }
                }
            }
            return card;
        };

        const mainGrid = document.createElement('div');
        mainGrid.className = 'course-grid';

        // Render Available
        available.forEach(c => mainGrid.appendChild(renderCourseCard(c)));

        container.innerHTML = ''; // Clear

        const wrapper = document.createElement('div');
        wrapper.className = 'education-container';
        wrapper.style.maxWidth = '1200px';
        wrapper.style.margin = '0 auto';
        wrapper.innerHTML = heroHTML;

        // Style the grid (Live Elements)
        mainGrid.style.display = 'grid';
        mainGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
        mainGrid.style.gap = '20px';
        mainGrid.style.marginTop = '25px';

        wrapper.appendChild(mainGrid);
        container.appendChild(wrapper);
        // Render Locked (Collapsible)
        if (locked.length > 0) {
            const details = document.createElement('details');
            details.style.marginTop = '30px';
            details.style.marginBottom = '20px';
            details.style.borderTop = '1px solid #334155';
            details.style.paddingTop = '20px';

            const summary = document.createElement('summary');
            summary.textContent = `📚 Ver otras formaciones (${locked.length} bloqueadas)`;
            summary.style.cursor = 'pointer';
            summary.style.color = '#94a3b8';
            summary.style.marginBottom = '15px';
            details.appendChild(summary);

            const lockedGrid = document.createElement('div');
            lockedGrid.className = 'course-grid';
            lockedGrid.style.display = 'grid';
            lockedGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
            lockedGrid.style.gap = '20px';
            lockedGrid.style.opacity = '0.7';

            locked.forEach(c => lockedGrid.appendChild(renderCourseCard(c, true)));

            details.appendChild(lockedGrid);

            // Need to append to container. But container has innerHTML set. 
            // We should append to the .education-container inside or just append to container?
            // container.innerHTML replaced everything.
            // The structure is: div#education-view > div.education-container > ...
            // So we should append to the .education-container.
            container.querySelector('.education-container').appendChild(details);
        }
    },

    showModal(title, msg, actions = [], skipDefaultAction = false) {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

        // Only convert newlines to <br> if the message is plain text (no HTML tags)
        const processedMsg = msg.includes('<') ? msg : msg.replace(/\n/g, '<br>');

        overlay.innerHTML = `
                    <div class="custom-modal-box">
                        <h3>${title}</h3>
                        <div class="modal-body">${processedMsg}</div>
                        <div class="modal-actions"></div>
                    </div>
                `;
        const actionBox = overlay.querySelector('.modal-actions');
        if (actions.length === 0 && !skipDefaultAction) actions.push({ text: 'Entendido', style: 'primary', fn: null });

        actions.forEach(a => {
            const btn = document.createElement('button');
            btn.textContent = a.text;
            btn.className = `btn-modal btn-${a.style}-modal`;
            btn.onclick = () => {
                // Execute callback first (so inputs are still in DOM)
                if (a.fn) {
                    // Optional: catch errors so modal still closes? 
                    // For now, let's just run it. If it fails, console will show it.
                    // But we should ensure close happens if possible, unless we want to keep it open on error?
                    // Simple approach: Run then Close.
                    try {
                        a.fn();
                    } catch (e) {
                        console.error("Modal Action Error:", e);
                        alert("Error executing action: " + e.message);
                    }
                }
                overlay.remove();
            };
            actionBox.appendChild(btn);
        });
        document.body.appendChild(overlay);
    },

    confirmModal(title, msg, onConfirm) {
        this.showModal(title, msg, [
            { text: 'Cancelar', style: 'secondary', fn: null },
            { text: 'Confirmar', style: 'danger', fn: onConfirm }
        ]);
    },

    getLabel(id) {
        const map = {
            // Career Paths
            'unskilled': 'Sin Titulación',
            'admin_contable': 'Administración y Finanzas',
            'gestor_cobros': 'Gestión de Cobros',
            'admin_inmo': 'Gestión Inmobiliaria',
            'prog_apps': 'Desarrollo de Apps / Web',
            'sys_support': 'Soporte y Sistemas',
            'mobile_dev': 'Desarrollo Móvil',
            'maint_ind': 'Mantenimiento Industrial',
            'clima': 'Climatización y Frío',
            'buildings': 'Mantenimiento de Edificios',
            'analyst_fin': 'Análisis Financiero',
            'consultant': 'Consultoría de Negocio',
            'sales_b2b': 'Ventas B2B',
            'swe': 'Ingeniería de Software',
            'data': 'Data & Analytics',
            'devops': 'Cloud & DevOps',
            'ing_obra': 'Ingeniería de Obra',
            'oficina_tecnica': 'Oficina Técnica',
            'urbz_consult': 'Urbanismo y Consultoría',
            'temporary': 'Trabajo Temporal',

            // Education IDs
            'bachillerato': 'Bachillerato',
            'fp_medio': 'FP Grado Medio',
            'fp_admin': 'FP Sup. Administración',
            'fp_dam': 'FP Sup. Desarrollo Apps',
            'fp_maint': 'FP Sup. Mantenimiento',
            'grado_ade': 'Grado en ADE',
            'grado_cs': 'Grado en Ing. Informática',
            'grado_civil': 'Grado en Ing. Civil',
            'master_fin': 'Máster en Finanzas',
            'master_ai': 'Máster en IA',
            'master_ing': 'Máster Ingeniería',
            'bootcamp': 'Bootcamp Programación'
        };
        return map[id] || id; // Fallback to ID if missing
    },

    updateJob(JobSys = JobSystem) {
        try {
            const jobContainer = document.getElementById('job-view');
            if (!jobContainer) return;
            jobContainer.innerHTML = '';
            const contentContainer = document.createElement('div');

            if (GameState.company) {
                contentContainer.className = 'company-dashboard-full-view';
                contentContainer.style.display = 'block';
            } else {
                contentContainer.className = 'dashboard-container';
            }
            jobContainer.appendChild(contentContainer);

            // --- SHARED: HOLDING LIST (MANAGED COMPANIES) ---
            if (GameState.ownedCompanies && GameState.ownedCompanies.length > 0) {
                const holdingSection = document.createElement('div');
                holdingSection.className = 'dashboard-card full-width mb-30';
                holdingSection.innerHTML = `<h3 style="color:#facc15; margin-bottom:15px; display:flex; align-items:center; gap:10px;">👑 Holding Empresarial</h3>`;
                const holdingList = document.createElement('div');
                holdingList.style.display = 'grid';
                holdingList.style.gap = '10px';

                GameState.ownedCompanies.forEach((co, idx) => {
                    const div = document.createElement('div');
                    div.className = 'holding-item-row';
                    div.innerHTML = `
                            <div class="holding-info">
                                <span class="co-name">${co.name}</span>
                                <span class="co-details">${co.typeName} | ${co.locationName}</span>
                            </div>
                            <div class="holding-stats">
                                <span class="co-profit">+${formatCurrency(co.baselineProfit)}/mes</span>
                                <button class="btn-sell-passive" data-idx="${idx}">VENDER</button>
                            </div>
                        `;
                    div.querySelector('.btn-sell-passive').onclick = () => {
                        UI.confirmModal('Vender Empresa', `¿Seguro que quieres vender ${co.name}?\n\nValoración: 5x Beneficio anual.`, () => {
                            const res = CompanyModule.sellPassiveCompany(idx);
                            if (res && res.success) {
                                UI.updateJob(JobSys);
                                UI.updateDashboard();
                                alert(res.message);
                            }
                        });
                    };
                    holdingList.appendChild(div);
                });
                holdingSection.appendChild(holdingList);
                contentContainer.appendChild(holdingSection);
            }

            if (!GameState.company) {
                // --- PROFESSIONAL DASHBOARD MODE ---

                const dashboardGrid = document.createElement('div');
                dashboardGrid.className = 'dashboard-grid mb-30';

                // --- CARD 1: CURRENT POSITION (HERO) ---
                const heroCard = document.createElement('div');
                heroCard.className = 'dashboard-card hero-card';

                const nextJob = JobSys.getAvailablePromotions();
                let expPercent = 0;
                let expText = "Nivel Máximo";
                if (nextJob) {
                    expPercent = Math.min(100, (JobSys.monthsInCurrentJob / nextJob.reqMonths) * 100);
                    expText = `${JobSys.monthsInCurrentJob.toFixed(1)} / ${nextJob.reqMonths} meses`;
                }

                heroCard.innerHTML = `
                        <div class="card-header">
                            <span class="badge-primary">PUESTO ACTUAL</span>
                            <span class="salary-badge">${formatCurrency(GameState.salary)}/mes</span>
                        </div>
                        <h2 class="hero-title">${GameState.jobTitle}</h2>
                        <div class="career-path">Trayectoria: ${UI.getLabel(JobSys.currentCareerPath)}</div>
                        
                        <div class="progress-section">
                            <div class="progress-label">
                                <span>Experiencia</span>
                                <span>${expText}</span>
                            </div>
                            <div class="progress-track">
                                <div class="progress-fill" style="width: ${expPercent}%"></div>
                            </div>
                        </div>
                    `;
                dashboardGrid.appendChild(heroCard);

                // Promotion / Raise Logic
                const path = JobSys.getCareerPath(JobSys.currentCareerPath);
                const currentJobIndex = (path && path.length > 0) ? path.findIndex(job => job.title === GameState.jobTitle) : -1;
                const isMaxLevel = (currentJobIndex !== -1 && currentJobIndex === path.length - 1);

                if (JobSys.currentCareerPath === 'none' || !path) {
                    // --- UNEMPLOYED OR TEMPORARY JOB CASE ---
                    const goalCard = document.createElement('div');
                    goalCard.className = 'dashboard-card goal-card';

                    // Check if has temporary jobs (gigs) - must have both gigs and salary
                    const hasGigs = GameState.currentGigs && GameState.currentGigs.length > 0 && GameState.salary > 0;

                    if (hasGigs) {
                        // Temporary job message
                        goalCard.innerHTML = `
                                <div class="card-header"><span class="badge-secondary">TRABAJO TEMPORAL</span></div>
                                <h3 class="goal-title">Trabajo Temporal</h3>
                                <p style="color:#94a3b8; margin-top:10px;">Esto es un trabajo temporal, no durará mucho.</p>
                            `;
                    } else {
                        // Unemployed message
                        goalCard.innerHTML = `
                                <div class="card-header"><span class="badge-secondary">BUSCA TRABAJO</span></div>
                                <h3 class="goal-title">Estás Desempleado</h3>
                                <p style="color:#94a3b8; margin-top:10px;">Revisa las ofertas de abajo y aplica a un puesto para empezar a ganar dinero.</p>
                            `;
                    }
                    dashboardGrid.appendChild(goalCard);

                } else if (!isMaxLevel) {
                    // --- SPECIAL CASE: TRES DEPORTE ---
                    if (GameState.jobTitle === 'TRES DEPORTE') {
                        const monthsSinceLastRequest = JobSys.monthsSinceLastRaise || 0;
                        const canAsk = monthsSinceLastRequest >= 2;
                        const monthsRemaining = Math.max(0, 2 - monthsSinceLastRequest);

                        const goalCard = document.createElement('div');
                        goalCard.className = 'dashboard-card goal-card';
                        goalCard.innerHTML = `
                                <div class="card-header"><span class="badge-warning">PEDIR AUMENTO</span></div>
                                <h3 class="goal-title">Solicitar Aumento de Salario</h3>
                                <p style="color:#94a3b8; margin:10px 0;">En TRES DEPORTE no hay ascensos, pero puedes pedir aumento cada 2 meses.</p>
                                
                                <div class="progress-section" style="margin-top:15px;">
                                    <div class="progress-label">
                                        <span>Tiempo desde última petición</span>
                                        <span>${monthsSinceLastRequest} / 2 meses</span>
                                    </div>
                                    <div class="edu-bar-bg"><div class="edu-bar-fill" style="width:${Math.min(100, (monthsSinceLastRequest / 2) * 100)}%"></div></div>
                                </div>

                                <button id="btn-raise-tres" class="btn-primary" style="margin-top:15px;" ${canAsk ? '' : 'disabled'}>
                                    ${canAsk ? 'Pedir Aumento' : `Esperar ${monthsRemaining} mes(es)`}
                                </button>
                            `;
                        if (canAsk) {
                            goalCard.querySelector('#btn-raise-tres').onclick = () => {
                                const res = JobSys.promote();
                                if (!res.success) {
                                    alert(res.message);
                                }
                                UI.updateJob(JobSys);
                            };
                        }
                        dashboardGrid.appendChild(goalCard);
                    }
                    // --- NORMAL PROMOTION CASE ---
                    else {
                        const nextJobInPath = path[currentJobIndex + 1];
                        const canPromote = JobSys.getAvailablePromotions() !== null;

                        const reqMonths = nextJobInPath.reqMonths;
                        const currentMonths = JobSys.monthsInCurrentJob;
                        const progress = Math.min(100, (currentMonths / reqMonths) * 100);

                        const isEduOk = !nextJobInPath.reqEdu || JobSys.checkEducation(nextJobInPath.reqEdu);
                        const isTimeOk = currentMonths >= reqMonths;

                        const nextCard = document.createElement('div');
                        nextCard.className = 'job-promo-card';
                        nextCard.innerHTML = `
                                <div class="job-promo-header">
                                    <div class="job-promo-title">
                                        <span>🚀 Siguiente Ascenso: ${nextJobInPath.title}</span>
                                    </div>
                                    <div class="job-promo-salary">+${formatCurrency(nextJobInPath.salary - GameState.salary)}/mes</div>
                                </div>
                                
                                <div style="margin-bottom:20px;">
                                    <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:#cbd5e1; margin-bottom:5px;">
                                        <span>Experiencia Requerida</span>
                                        <span>${Math.floor(currentMonths)} / ${reqMonths} meses</span>
                                    </div>
                                    <div class="edu-bar-bg"><div class="edu-bar-fill" style="width:${progress}%"></div></div>
                                </div>

                                <div style="display:flex; gap:10px; margin-bottom:20px; flex-wrap:wrap;">
                                    <span class="req-tag ${isTimeOk ? 'success' : 'fail'}">
                                        ${isTimeOk ? '✓' : '⏳'} Experiencia
                                    </span>
                                    ${nextJobInPath.reqEdu ? `
                                        <span class="req-tag ${isEduOk ? 'success' : 'fail'}">
                                            ${isEduOk ? '✓' : '❌'} ${UI.getLabel(nextJobInPath.reqEdu)}
                                        </span>
                                    ` : ''}
                                </div>

                                <button id="btn-promote" class="btn-primary" ${canPromote && isEduOk ? '' : 'disabled'}>
                                    Solicitar Ascenso
                                </button>
                            `;
                        if (canPromote && isEduOk) {
                            nextCard.querySelector('#btn-promote').onclick = () => {
                                const res = JobSys.promote();
                                if (res.success) {
                                    UI.showModal('¡Ascenso Conseguido!', res.message, [{ text: 'Celebrar', style: 'success', fn: () => UI.updateJob(JobSys) }]);
                                    UI.updateHeader();
                                    UI.updateDashboard();
                                } else {
                                    alert(res.message);
                                }
                            };
                        }
                        dashboardGrid.appendChild(nextCard);
                    } // Close normal promotion case
                } else {
                    // --- MAX LEVEL CASE OR TRES DEPORTE ---

                    // SPECIAL CASE: TRES DEPORTE
                    if (GameState.jobTitle === 'TRES DEPORTE') {
                        const monthsSinceLastRequest = JobSys.monthsSinceLastRaise || 0;
                        const canAsk = monthsSinceLastRequest >= 2;
                        const monthsRemaining = Math.max(0, 2 - monthsSinceLastRequest);

                        const goalCard = document.createElement('div');
                        goalCard.className = 'dashboard-card goal-card';
                        goalCard.innerHTML = `
                                <div class="card-header"><span class="badge-warning">PEDIR AUMENTO</span></div>
                                <h3 class="goal-title">Solicitar Aumento de Salario</h3>
                                <p style="color:#94a3b8; margin:10px 0;">En TRES DEPORTE no hay ascensos, pero puedes pedir aumento cada 2 meses.</p>
                                
                                <div class="progress-section" style="margin-top:15px;">
                                    <div class="progress-label">
                                        <span>Tiempo desde última petición</span>
                                        <span>${monthsSinceLastRequest.toFixed(1)} / 2 meses</span>
                                    </div>
                                    <div class="progress-track">
                                        <div class="progress-fill" style="width: ${Math.min(100, (monthsSinceLastRequest / 2) * 100)}%"></div>
                                    </div>
                                </div>
                                
                                ${!canAsk ? `<p style="color:#f87171; margin-top:15px; font-size:0.9rem;">⏱️ Podrás pedir aumento en ${monthsRemaining.toFixed(1)} mes(es)</p>` : ''}
                                
                                <button class="btn-promote" ${!canAsk ? 'disabled' : ''} style="margin-top:15px; width:100%; padding:12px; background:${canAsk ? 'var(--success-color)' : '#334155'}; color:white; border:none; border-radius:8px; font-weight:bold; cursor:${canAsk ? 'pointer' : 'not-allowed'};">
                                    ${canAsk ? '💰 Pedir Aumento' : '🔒 Aún no disponible'}
                                </button>
                            `;

                        const promoteBtn = goalCard.querySelector('.btn-promote');
                        if (canAsk) {
                            promoteBtn.onclick = () => {
                                const res = JobSys.promote();
                                alert(res.message);
                                UI.updateJob(JobSys);
                            };
                        }

                        dashboardGrid.appendChild(goalCard);
                    }
                    // NORMAL MAX LEVEL CASE (RAISE SYSTEM)  
                    else {
                        const monthsSince = JobSys.monthsSinceLastRaise || 0;
                        const canRaise = monthsSince >= 12;
                        const waittime = 12 - monthsSince;

                        const raiseCard = document.createElement('div');
                        raiseCard.className = 'job-peak-card';
                        raiseCard.innerHTML = `
                                <div class="job-peak-content">
                                    <h3>👑 Cima Profesional</h3>
                                    <p style="color:#cbd5e1; font-size:0.95rem;">Has alcanzado el máximo nivel.</p>
                                    <div style="margin-top:10px;">
                                        <span class="req-tag ${canRaise ? 'success' : 'fail'}">
                                            ${canRaise ? '✓ Disponible' : '⏳ Cooldown: ' + Math.ceil(waittime) + ' meses'}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <button id="btn-request-raise" class="btn-gold" ${canRaise ? '' : 'disabled'}>
                                        ${canRaise ? 'Solicitar Aumento' : 'Revisión Salarial'}
                                    </button>
                                </div>
                            `;

                        if (canRaise) {
                            raiseCard.querySelector('#btn-request-raise').onclick = () => {
                                const res = JobSys.requestRaise();
                                UI.showModal('Respuesta del Jefe', res.message, [{
                                    text: 'Continuar', style: 'primary', fn: () => {
                                        UI.updateJob(JobSys);
                                        UI.updateHeader();
                                        UI.updateDashboard();
                                    }
                                }]);
                            };
                        }
                        dashboardGrid.appendChild(raiseCard);
                    } // Close normal max level else
                } // Close MAX LEVEL case

                contentContainer.appendChild(dashboardGrid);

                // 3. Job Market (Grid)
                const marketSection = document.createElement('div');
                marketSection.className = 'market-section';
                marketSection.innerHTML = `<h3 class="section-title">🌐 Mercado Laboral</h3>`;

                const marketGrid = document.createElement('div');
                marketGrid.className = 'market-grid';

                const vacancyList = JobSys.getAllVacancies().filter(vac => vac.reqMonths === 0);

                // Split Gigs vs Regular
                const gigs = vacancyList.filter(v => v.path === 'temporary');
                const regular = vacancyList.filter(v => v.path !== 'temporary');

                // --- SECTION: GIGS ---
                const gigSection = document.createElement('div');
                gigSection.className = 'market-section';
                gigSection.style.marginBottom = '40px';
                gigSection.innerHTML = `<h3 class="section-title" style="color:#facc15;">⚡ Trabajo Temporal</h3>`;
                const gigGrid = document.createElement('div');
                gigGrid.className = 'market-grid';

                gigs.forEach(vac => {
                    const card = document.createElement('div');
                    card.className = 'market-card';
                    card.innerHTML = `
                                <div class="market-card-top">
                                    <h4>${vac.title}</h4>
                                    <span class="market-path">Trabajo Temporal</span>
                                </div>
                                <div class="market-tags">
                                    <span class="tag" style="background:rgba(234, 179, 8, 0.2); color:#facc15; border:1px solid #facc15;">⏱ ${vac.duration} meses</span>
                                </div>
                                <div class="market-footer">
                                    <div class="market-salary">${formatCurrency(vac.salary)}</div>
                                    <button class="btn-apply-small">Aplicar</button>
                                </div>
                            `;
                    card.querySelector('.btn-apply-small').onclick = () => {
                        const res = JobSys.applyToJob(vac.title);
                        if (res.success) {
                            UI.showModal('¡Aceptado!', `Empiezas: <strong>${vac.title}</strong><br>Salario: ${formatCurrency(vac.salary)}/mes<br>Duración: ${vac.duration} meses.`, [{ text: 'OK', style: 'success', fn: () => UI.updateJob(JobSys) }]);
                            UI.updateHeader();
                            UI.updateDashboard();
                        } else {
                            alert(res.message);
                        }
                    };
                    gigGrid.appendChild(card);
                });
                gigSection.appendChild(gigGrid);
                contentContainer.appendChild(gigSection);


                // --- SECTION: CAREER MARKET ---
                const eligible = [];
                const locked = [];

                regular.forEach(vac => {
                    if (!vac.reqEdu || JobSys.checkEducation(vac.reqEdu)) {
                        eligible.push(vac);
                    } else {
                        locked.push(vac);
                    }
                });

                // 1. RENDER ELIGIBLE
                eligible.forEach(vac => {
                    const card = document.createElement('div');
                    card.className = 'market-card';

                    let eduText = null;
                    if (vac.reqEdu) {
                        if (Array.isArray(vac.reqEdu)) {
                            eduText = vac.reqEdu.map(id => UI.getLabel(id)).join(' o ');
                        } else {
                            eduText = UI.getLabel(vac.reqEdu);
                        }
                    }

                    const pathName = UI.getLabel(vac.path);

                    card.innerHTML = `
                            <div class="market-card-top">
                                <h4>${vac.title}</h4>
                                <span class="market-path">${pathName}</span>
                            </div>
                            <div class="market-tags">
                                <span class="tag">Nivel Inicial</span>
                                ${vac.type === 'gig' ? `<span class="tag" style="background:rgba(234, 179, 8, 0.2); color:#facc15; border:1px solid #facc15;">⏱ ${vac.duration} meses</span>` : ''}
                                ${eduText ? `<span class="tag tag-edu" style="background:transparent; border:1px solid #94a3b8; color:#cbd5e1;">${eduText}</span>` : ''}
                            </div>
                            <div class="market-footer">
                                <div class="market-salary">${formatCurrency(vac.salary)}</div>
                                <button class="btn-apply-small">Aplicar</button>
                            </div>
                        `;

                    card.querySelector('.btn-apply-small').onclick = () => {
                        const res = JobSys.applyToJob(vac.title);
                        if (res.success) {
                            let welcomeMsg = `Has sido contratado como <strong>${vac.title}</strong>.<br><br>
                                    Salario: ${formatCurrency(vac.salary)}/mes.`;

                            if (!GameState.tutorialState.job || vac.title.includes('Reponedor')) {
                                // welcomeMsg += `<br><br>🔴 <strong>IMPORTANTE:</strong> El tiempo en este juego avanza por meses. Pulsa el botón <strong>"Siguiente Mes"</strong> (arriba a la derecha) para cobrar tu nómina y avanzar.`;
                                GameState.tutorialState.job = true;
                            }

                            UI.showModal('¡Contratado!', welcomeMsg, [{ text: '¡A trabajar!', style: 'success', fn: () => UI.updateJob(JobSys) }]);

                            UI.updateHeader();
                            UI.updateDashboard();
                        } else {
                            UI.showModal('Solicitud Rechazada', res.message, [{ text: 'Vaya...', style: 'secondary', fn: null }]);
                        }
                    };
                    marketGrid.appendChild(card);
                });
                marketSection.appendChild(marketGrid);

                // 2. RENDER LOCKED
                if (locked.length > 0) {
                    const details = document.createElement('details');
                    details.style.marginTop = '30px';
                    details.style.marginBottom = '20px';
                    details.style.borderTop = '1px solid #334155';
                    details.style.paddingTop = '20px';

                    const summary = document.createElement('summary');
                    summary.textContent = `📚 Ver otras oportunidades (${locked.length} requieren formación)`;
                    summary.style.cursor = 'pointer';
                    summary.style.color = '#94a3b8';
                    summary.style.marginBottom = '15px';
                    details.appendChild(summary);

                    const lockedGrid = document.createElement('div');
                    lockedGrid.className = 'market-grid';
                    lockedGrid.style.opacity = '0.7';

                    locked.forEach(vac => {
                        const card = document.createElement('div');
                        card.className = 'market-card';
                        card.style.borderColor = '#475569';

                        let eduText = null;
                        if (vac.reqEdu) {
                            if (Array.isArray(vac.reqEdu)) {
                                eduText = vac.reqEdu.map(id => UI.getLabel(id)).join(' o ');
                            } else {
                                eduText = UI.getLabel(vac.reqEdu);
                            }
                        }

                        const pathName = UI.getLabel(vac.path);

                        card.innerHTML = `
                                <div class="market-card-top">
                                    <h4 style="color:#cbd5e1">${vac.title}</h4>
                                    <span class="market-path">${pathName}</span>
                                </div>
                                <div class="market-tags">
                                    <span class="tag">Nivel Inicial</span>
                                    ${eduText ? `<span class="tag tag-edu" style="background:transparent; border:1px solid #ef4444; color:#ef4444;">Req: ${eduText}</span>` : ''}
                                </div>
                                <div class="market-footer">
                                    <div class="market-salary">${formatCurrency(vac.salary)}</div>
                                    <button class="btn-apply-small" disabled style="background:#475569; opacity:0.5; cursor:not-allowed;">Falta Título</button>
                                </div>
                            `;
                        lockedGrid.appendChild(card);
                    });

                    details.appendChild(lockedGrid);
                    marketSection.appendChild(details);
                }

                contentContainer.appendChild(marketSection);

                // 4. Entrepreneur Footer
                const entrepreneurSection = document.createElement('div');
                entrepreneurSection.className = 'entrepreneur-footer';
                entrepreneurSection.innerHTML = `
                        <div class="entrepreneur-content">
                            <div class="entrepreneur-text">
                                <h3>🚀 ¿Listo para dar el gran salto?</h3>
                                <p>Deja tu empleo y construye tu propio legado.</p>
                            </div>
                            <button id="btn-found-company" class="btn-entrepreneur">FUNDAR EMPRESA</button>
                        </div>
                    `;
                entrepreneurSection.querySelector('#btn-found-company').onclick = () => UI.openCompanyWizard();
                contentContainer.appendChild(entrepreneurSection);
            } else {
                // --- COMPANY OWNER MODE ---
                const co = GameState.company;
                const activeTab = jobContainer.dataset.activeTab || 'summary';

                contentContainer.innerHTML = `
                        <div class="company-dashboard">
                            <div class="company-header">
                                <div>
                                    <h2>${co.name}</h2>
                                    <p>${co.typeName} | ${co.locationName}</p>
                                </div>
                                <div class="company-finance-summary">
                                    <div class="fin-box"><span class="label">Caja</span><span class="val">${formatCurrency(co.cash)}</span></div>
                                    <div class="fin-box"><span class="label">Beneficio Mes</span><span class="val ${co.profitLastMonth >= 0 ? 'green' : 'red'}">${formatCurrency(co.profitLastMonth)}</span></div>
                                    <button id="btn-automate" class="btn-gold" style="font-size:0.7rem;">Automatizar</button>
                                </div>
                            </div>

                            <div class="company-tabs">
                                <button class="tab-btn ${activeTab === 'summary' ? 'active' : ''}" data-tab="summary">
                                    <span class="mobile-text">📊</span>
                                    <span class="desktop-text">Resumen</span>
                                </button>
                                <button class="tab-btn ${activeTab === 'staff' ? 'active' : ''}" data-tab="staff">
                                    <span class="mobile-text">👥</span>
                                    <span class="desktop-text">Personal</span>
                                </button>
                                <button class="tab-btn ${activeTab === 'product' ? 'active' : ''}" data-tab="product">
                                    <span class="mobile-text">📦</span>
                                    <span class="desktop-text">Producto</span>
                                </button>
                                <button class="tab-btn ${activeTab === 'marketing' ? 'active' : ''}" data-tab="marketing">
                                    <span class="mobile-text">📢</span>
                                    <span class="desktop-text">Marketing</span>
                                </button>
                                <button class="tab-btn ${activeTab === 'finance' ? 'active' : ''}" data-tab="finance">
                                    <span class="mobile-text">💰</span>
                                    <span class="desktop-text">Finanzas</span>
                                </button>
                            </div>

                            <div class="company-tab-content" id="co-tab-content">
                                <!-- Content injected here -->
                            </div>
                        </div>
                    `;

                contentContainer.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.onclick = () => {
                        jobContainer.dataset.activeTab = btn.dataset.tab;
                        UI.updateJob(JobSystem);
                        UI.checkContextualTutorial('company_' + btn.dataset.tab);
                    };
                });

                document.getElementById('btn-automate').onclick = () => {
                    const cost = Math.max(30000, (co.profitLastMonth || 0) * 3);
                    UI.confirmModal('Contratar Gerente', `Coste: ${formatCurrency(cost)}\n\n⚠️ Tu empresa pasará a ser PASIVA.\nPerderás el control manual.\n¿Deseas automatizarla?`, () => {
                        const r = CompanyModule.hireManager();
                        if (r) {
                            UI.showModal(r.success ? '¡Éxito!' : 'Error', r.message, [
                                {
                                    text: 'Aceptar', style: 'primary', fn: () => {
                                        if (r.success) { UI.updateJob(JobSystem); UI.updateHeader(); UI.updateDashboard(); }
                                    }
                                }
                            ]);
                        }
                    });
                };


                const tabContent = document.getElementById('co-tab-content');

                // Shared Helpers (Defined here to be available across all tabs)
                window.setStrat = (cat, val) => {
                    CompanyModule.setStrategicOption(cat, val);
                    UI.updateJob(JobSystem);
                };
                window.investCo = (type) => {
                    const r = CompanyModule.invest(type);
                    if (r) { if (r.message) alert(r.message); UI.updateJob(JobSystem); }
                };
                window.updatePrice = () => {
                    const el = document.getElementById('price-input');
                    if (!el) return;
                    const val = parseFloat(el.value);
                    if (val > 0) {
                        GameState.company.customPrice = val;
                        alert(`Precio fijado en ${formatCurrency(val)}. La exigencia de calidad cambiará.`);
                        UI.updateJob(JobSystem);
                    }
                };

                if (activeTab === 'summary') {
                    try {
                        let eventsHtml = co.events.map(e => `<li>${e}</li>`).join('');
                        if (!eventsHtml) eventsHtml = '<li style="color:#aaa">Sin novedades este mes.</li>';

                        let revDiff = 0;
                        let expDiff = 0;
                        let profDiff = 0;

                        if (co.financialHistory && co.financialHistory.length >= 2) {
                            const curr = co.financialHistory[co.financialHistory.length - 1];
                            const prev = co.financialHistory[co.financialHistory.length - 2];

                            if (curr && prev) {
                                if (prev.revenue > 0) revDiff = (curr.revenue - prev.revenue) / prev.revenue;
                            }
                        }

                        let details = { wages: 0, rent: 0, cogs: 0, marketing: 0, opex: 0, salary: 0 };
                        let income = { revenue: co.revenueLastMonth };

                        if (co.financialHistory && co.financialHistory.length > 0) {
                            const lastEntry = co.financialHistory[co.financialHistory.length - 1];
                            if (lastEntry.expenses) {
                                details = { ...details, ...lastEntry.expenses };
                            }
                        }

                        const fmtDiff = (val) => {
                            const s = val > 0 ? '+' : '';
                            const color = val > 0 ? '#4ade80' : (val < 0 ? '#f87171' : '#94a3b8');
                            return `<span style="color:${color}; font-size:0.8rem; margin-left:5px;">(${s}${(val * 100).toFixed(1)}%)</span>`;
                        };

                        tabContent.innerHTML = `
                                <div class="summary-grid">
                                    <div class="card kpi-card">
                                        <h3>Estado General</h3>
                                        <p>Reputación: <strong>${co.reputation.toFixed(1)}/5.0</strong></p>
                                        <p>Clientes: ${co.lastStats ? co.lastStats.customers : 0} / mes</p>
                                        <p style="font-size:0.8rem; color:#94a3b8">Capacidad: <strong>${co.lastStats ? co.lastStats.capacity : 0}</strong> / mes</p>
                                        <div style="margin-top:10px; border-top:1px solid #334155; padding-top:5px;">
                                            <p>Ingresos: ${formatCurrency(co.revenueLastMonth)} ${fmtDiff(revDiff)}</p>
                                            <p>Gastos: ${formatCurrency(co.expensesLastMonth)} ${fmtDiff(expDiff)}</p>
                                            <p style="font-size:1.1rem; margin-top:5px;">Beneficio: <strong style="color:${co.profitLastMonth >= 0 ? 'var(--success-color)' : 'var(--danger-color)'}">${formatCurrency(co.profitLastMonth)}</strong> ${fmtDiff(profDiff)}</p>
                                        </div>
                                    </div>

                                    <div class="card events-card">
                                        <h3>📢 Novedades</h3>
                                        <ul style="max-height:150px; overflow-y:auto; padding-left:20px;">${eventsHtml}</ul>
                                    </div>
                                    
                                    <div class="card breakdown-card">
                                        <h3>📋 Desglose Financiero</h3>
                                        <table style="width:100%; font-size:0.85rem; border-collapse:collapse;">
                                            <tr style="border-bottom:1px solid #334155;">
                                                <td style="padding:4px 0;">Ventas</td>
                                                <td style="text-align:right; color:#4ade80;">+${formatCurrency(income.revenue)}</td>
                                            </tr>
                                            <tr><td style="padding:4px 0;">Coste Bienes (COGS)</td><td style="text-align:right;">-${formatCurrency(details.cogs)}</td></tr>
                                            <tr><td style="padding:4px 0;">Salarios Plantilla</td><td style="text-align:right;">-${formatCurrency(details.wages)}</td></tr>
                                            <tr><td style="padding:4px 0;">Alquiler</td><td style="text-align:right;">-${formatCurrency(details.rent)}</td></tr>
                                            <tr><td style="padding:4px 0;">Marketing</td><td style="text-align:right;">-${formatCurrency(details.marketing)}</td></tr>
                                            <tr><td style="padding:4px 0;">Operaciones (I+D)</td><td style="text-align:right;">-${formatCurrency(details.opex)}</td></tr>
                                            <tr style="border-bottom:1px solid #334155;"><td style="padding:4px 0;">Salario CEO</td><td style="text-align:right;">-${formatCurrency(details.salary)}</td></tr>
                                            <tr style="font-weight:bold;"><td style="padding-top:5px;">TOTAL GASTOS</td><td style="text-align:right; padding-top:5px;">-${formatCurrency(co.expensesLastMonth)}</td></tr>
                                        </table>
                                    </div>

                                    <div class="card chart-card">
                                        <h3>Evolución Financiera</h3>
                                        <div style="height:200px; width:100%;">
                                            <canvas id="revenueChart"></canvas>
                                        </div>
                                    </div>
                                </div>
                            `;

                        if (co.revenueHistory && co.revenueHistory.length > 0) {
                            const ctx = document.getElementById('revenueChart').getContext('2d');
                            const labels = Array.from({ length: co.revenueHistory.length }, (_, i) => i + 1).slice(-12);
                            const revData = co.revenueHistory.slice(-12);
                            const profData = co.profitHistory.slice(-12);
                            const expData = co.financialHistory ? co.financialHistory.slice(-12).map(h => h.expenses ? h.expenses.total : 0) : [];

                            new Chart(ctx, {
                                type: 'line',
                                data: {
                                    labels: labels,
                                    datasets: [
                                        { label: 'Ingresos', data: revData, borderColor: '#4ade80', tension: 0.2, pointRadius: 2 },
                                        { label: 'Gastos', data: expData, borderColor: '#f87171', tension: 0.2, pointRadius: 2 },
                                        { label: 'Beneficio', data: profData, borderColor: '#38bdf8', tension: 0.2, pointRadius: 2 }
                                    ]
                                },
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: true, labels: { boxWidth: 10, font: { size: 10 } } } },
                                    scales: {
                                        y: { grid: { color: '#334155' }, ticks: { font: { size: 9 } } },
                                        x: { display: false }
                                    }
                                }
                            });
                        }
                    } catch (err) {
                        console.error("Summary Render Error", err);
                        tabContent.innerHTML = `<div class="error-box">ERROR RENDERING SUMMARY: ${err.message}</div>`;
                    }

                } else if (activeTab === 'staff') {
                    let staffHtml = '';
                    let upgradeCost = 0;
                    let upgradeText = "Ampliar Oficina";
                    let upgradeDisabled = "";

                    if (co.maxStaff === 5) upgradeCost = Math.max(15000, (co.profitLastMonth || 0) * 3);
                    else if (co.maxStaff === 10) upgradeCost = Math.max(30000, (co.profitLastMonth || 0) * 3);
                    else {
                        upgradeText = "Máximo Alcanzado";
                        upgradeDisabled = "disabled style='opacity:0.5; cursor:not-allowed;'";
                    }

                    if (!upgradeDisabled) {
                        upgradeText += ` (${formatCurrency(upgradeCost)})`;
                    }

                    // Check if Expert hiring should be locked (productLevel must be >= 5)
                    const expertLocked = co.productLevel < 5;
                    const expertBtnDisabled = expertLocked ? 'disabled' : '';
                    const expertBtnStyle = expertLocked ? 'opacity:0.5; cursor:not-allowed;' : '';
                    const expertBtnText = expertLocked ? `Experto (1.8k) 🔒 Req: Nv.5` : 'Experto (1.8k)';


                    co.staff.forEach((emp, i) => {
                        staffHtml += `
                                <div class="staff-row">
                                    <div>
                                        <strong>${emp.role}</strong><br>
                                        <span style="font-size:0.8rem">Habilidad: ${(emp.skill * 100).toFixed(0)}% | Moral: ${(emp.morale * 100).toFixed(0)}%</span>
                                    </div>
                                    <div style="text-align:right">
                                        <div style="margin-bottom:5px;">
                                            <label style="font-size:0.75rem; color:#94a3b8; display:block; margin-bottom:2px;">Salario</label>
                                            <div style="display:flex; align-items:center; gap:5px; justify-content:flex-end;">
                                                <input 
                                                    type="number" 
                                                    id="salary-input-${i}" 
                                                    value="${emp.salary}" 
                                                    min="1000" 
                                                    max="9000" 
                                                    step="100"
                                                    style="width:80px; padding:4px 6px; background:#0f172a; border:1px solid #475569; color:white; border-radius:4px; font-size:0.85rem; text-align:right;"
                                                    onchange="updateEmployeeSalary(${i})"
                                                >
                                                <button 
                                                    onclick="updateEmployeeSalary(${i})" 
                                                    style="background:var(--accent-color); color:#0f172a; border:none; border-radius:4px; padding:4px 8px; cursor:pointer; font-size:0.7rem; font-weight:600;"
                                                    title="Actualizar salario"
                                                >✓</button>
                                            </div>
                                        </div>
                                        <div style="font-size:0.7rem; color:#94a3b8; margin-bottom:3px;">Req. Mín: ${formatCurrency(emp.requiredWage)}</div>
                                        <label style="font-size:0.7rem;"><input type="checkbox" ${emp.autoWage ? 'checked' : ''} onchange="toggleAutoWage(${i})"> Auto-subida</label>
                                    </div>
                                    <div style="text-align:right">
                                         <button onclick="fireEmployee(${i})" style="color:var(--danger-color); background:none; border:1px solid var(--danger-color); border-radius:4px; padding:2px 5px; cursor:pointer">Despedir</button>
                                    </div>
                                </div>
                            `;
                    });


                    tabContent.innerHTML = `
                            <div class="staff-section">
                                <div class="staff-header">
                                    <h3>Plantilla (${co.staff.length} / ${co.maxStaff})</h3>
                                    <button id="btn-upgrade-office" class="btn-sm" ${upgradeDisabled}>${upgradeText}</button>
                                </div>
                                <div class="staff-list">
                                    ${staffHtml || '<p>No hay empleados.</p>'}
                                </div>
                                <div class="hire-panel">
                                    <h4>Contratar</h4>
                                    <div style="display:flex; gap:5px;">
                                        <button onclick="hireRole('Dependiente', 1200)" class="btn-hire">Dependiente (1.2k)</button>
                                        <button onclick="hireRole('Experto', 1800)" class="btn-hire" ${expertBtnDisabled} style="${expertBtnStyle}" title="${expertLocked ? 'Requiere Nivel de Producto 5 (Actual: ' + co.productLevel + ')' : ''}">${expertBtnText}</button>
                                    </div>
                                    ${expertLocked ? '<p style="color:#fbbf24; font-size:0.75rem; margin-top:8px; text-align:center;">💡 Mejora el Nivel de Producto a 5 para desbloquear empleados Expertos (Actual: Nivel ' + co.productLevel + ')</p>' : ''}
                                </div>
                            </div>
                        `;

                    document.getElementById('btn-upgrade-office').onclick = () => {
                        const r = CompanyModule.upgradeOffice();
                        if (r) { alert(r.message); UI.updateJob(JobSystem); }
                    };

                    window.hireRole = (role, sal) => {
                        // Validate Expert hiring restriction
                        if (role === 'Experto' && GameState.company.productLevel < 5) {
                            const lockMsg = `
                                        <div style="text-align:center;">
                                            <p style="margin-bottom:15px;">No puedes contratar <strong>Empleados Expertos</strong> aún.</p>
                                            <div style="background:rgba(251, 191, 36, 0.1); border:1px solid #fbbf24; border-radius:8px; padding:15px; margin:15px 0;">
                                                <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                                                    <span>Requisito:</span>
                                                    <strong style="color:#fbbf24;">Nivel de Producto 5</strong>
                                                </div>
                                                <div style="display:flex; justify-content:space-between;">
                                                    <span>Nivel Actual:</span>
                                                    <strong style="color:#f87171;">Nivel ${GameState.company.productLevel}</strong>
                                                </div>
                                            </div>
                                            <p style="color:#94a3b8; font-size:0.9rem; margin-top:15px;">
                                                💡 Debes invertir más en <strong>Desarrollo de Producto (I+D)</strong>.
                                            </p>
                                            <p style="color:#94a3b8; font-size:0.9rem;">
                                                Ve a la pestaña <strong style="color:#38bdf8;">"Producto"</strong> y realiza inversiones hasta alcanzar el Nivel 5.
                                            </p>
                                        </div>
                                    `;
                            UI.showModal('🔒 Empleados Expertos Bloqueados', lockMsg, [
                                { text: 'Entendido', style: 'secondary', fn: null }
                            ]);
                            return;
                        }
                        const skill = role === 'Experto' ? 0.8 : 0.4;
                        const r = CompanyModule.hireStaff(role, sal, skill);
                        if (r) {
                            if (!r.success) {
                                UI.showModal('❌ Error al Contratar', r.message, [
                                    { text: 'Cerrar', style: 'secondary', fn: null }
                                ]);
                            }
                            UI.updateJob(JobSystem);
                        }
                    };
                    window.fireEmployee = (i) => {
                        if (confirm('¿Despedir empleado? Baja moral del equipo.')) {
                            CompanyModule.fireStaff(i);
                            UI.updateJob(JobSystem);
                        }
                    };
                    window.toggleAutoWage = (i) => {
                        if (GameState.company.staff[i]) GameState.company.staff[i].autoWage = !GameState.company.staff[i].autoWage;
                    }

                    window.updateEmployeeSalary = (employeeIndex) => {
                        const inputEl = document.getElementById(`salary-input-${employeeIndex}`);
                        const newSalary = parseInt(inputEl.value);

                        // Validation: Range check
                        if (isNaN(newSalary) || newSalary < 1000 || newSalary > 9000) {
                            UI.showModal(
                                '⚠️ Salario Inválido',
                                'El salario debe estar entre <strong>1.000€</strong> y <strong>9.000€</strong>.',
                                [{
                                    text: 'Entendido', style: 'secondary', fn: () => {
                                        inputEl.value = GameState.company.staff[employeeIndex].salary;
                                    }
                                }]
                            );
                            return;
                        }

                        const employee = GameState.company.staff[employeeIndex];
                        const oldSalary = employee.salary;

                        // Warning: Below required wage
                        if (newSalary < employee.requiredWage) {
                            const warningMsg = `
                                        <div style="text-align:left;">
                                            <p style="margin-bottom:10px;">Estás estableciendo el salario por debajo del mínimo requerido:</p>
                                            <div style="background:rgba(248, 113, 113, 0.1); border-left:3px solid #f87171; padding:10px; margin:10px 0; border-radius:4px;">
                                                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                                    <span>Nuevo salario:</span>
                                                    <strong>${formatCurrency(newSalary)}</strong>
                                                </div>
                                                <div style="display:flex; justify-content:space-between;">
                                                    <span>Mínimo requerido:</span>
                                                    <strong style="color:#f87171;">${formatCurrency(employee.requiredWage)}</strong>
                                                </div>
                                            </div>
                                            <p style="color:#fbbf24; margin-top:10px;">
                                                ⚠️ Esto afectará <strong>negativamente la MORAL</strong> del empleado y reducirá su productividad.
                                            </p>
                                            <p style="margin-top:10px;">¿Continuar de todos modos?</p>
                                        </div>
                                    `;

                            UI.confirmModal('⚠️ Advertencia de Salario Bajo', warningMsg, () => {
                                // User confirmed - proceed with update
                                employee.salary = newSalary;

                                const diff = newSalary - oldSalary;
                                const diffText = diff >= 0 ? `+${formatCurrency(diff)}` : formatCurrency(diff);

                                UI.showModal(
                                    '⚠️ Salario Reducido',
                                    `<div style="text-align:center;">
                                                <p>Salario actualizado a <strong style="color:#f87171;">${formatCurrency(newSalary)}</strong></p>
                                                <p style="color:#94a3b8; font-size:0.9rem;">(${diffText})</p>
                                                <p style="margin-top:15px; color:#fbbf24;">😠 Esto afectará la moral del empleado.</p>
                                            </div>`,
                                    [{
                                        text: 'Entendido', style: 'secondary', fn: () => {
                                            UI.updateJob(JobSystem);
                                            UI.updateHeader();
                                        }
                                    }]
                                );
                            }, () => {
                                // User cancelled - restore old value
                                inputEl.value = oldSalary;
                            });
                            return;
                        }

                        // Update salary (if not below required wage)
                        employee.salary = newSalary;

                        // Feedback message
                        const diff = newSalary - oldSalary;
                        const diffText = diff >= 0 ? `+${formatCurrency(diff)}` : formatCurrency(diff);

                        if (diff > 0) {
                            UI.showModal(
                                '✅ Salario Actualizado',
                                `<div style="text-align:center;">
                                            <p>Nuevo salario: <strong style="color:#4ade80;">${formatCurrency(newSalary)}</strong></p>
                                            <p style="color:#94a3b8; font-size:0.9rem;">(${diffText})</p>
                                            <p style="margin-top:15px; color:#4ade80;">😊 El empleado estará más motivado.</p>
                                        </div>`,
                                [{
                                    text: 'Perfecto', style: 'success', fn: () => {
                                        UI.updateJob(JobSystem);
                                        UI.updateHeader();
                                    }
                                }]
                            );
                        } else if (diff < 0) {
                            UI.showModal(
                                '⚠️ Salario Reducido',
                                `<div style="text-align:center;">
                                            <p>Nuevo salario: <strong style="color:#f87171;">${formatCurrency(newSalary)}</strong></p>
                                            <p style="color:#94a3b8; font-size:0.9rem;">(${diffText})</p>
                                            <p style="margin-top:15px; color:#fbbf24;">😠 Esto afectará la moral del empleado.</p>
                                        </div>`,
                                [{
                                    text: 'Entendido', style: 'secondary', fn: () => {
                                        UI.updateJob(JobSystem);
                                        UI.updateHeader();
                                    }
                                }]
                            );
                        } else {
                            UI.showModal(
                                'ℹ️ Salario Confirmado',
                                `<div style="text-align:center;">
                                            <p>Salario confirmado: <strong>${formatCurrency(newSalary)}</strong></p>
                                        </div>`,
                                [{
                                    text: 'OK', style: 'primary', fn: () => {
                                        UI.updateJob(JobSystem);
                                        UI.updateHeader();
                                    }
                                }]
                            );
                        }
                    }

                } else if (activeTab === 'product') {
                    const baseTicket = CompanyModule.businessTypes[co.typeId].baseTicket;
                    const currentPrice = co.customPrice || baseTicket;

                    const curProv = CompanyModule.providers[co.providerId];
                    const curActualQ = curProv.quality + ((co.productLevel - 1) * 0.05);
                    const neededGap = (co.reputation - 3.5) / 5;
                    const maxRequired = curActualQ - neededGap;
                    const allowedPct = (maxRequired - 0.7) / 2;
                    const equiPrice = baseTicket * (1 + allowedPct);

                    const stats = co.lastStats || { actualQuality: 0, requiredQuality: 0, targetRep: 3, repGrowth: 0 };
                    const qGap = stats.actualQuality - stats.requiredQuality;
                    const qColor = qGap >= 0 ? '#4ade80' : '#f87171';
                    const qText = qGap >= 0 ? 'Excelente (Sube Reputación)' : 'Insuficiente (Baja Reputación)';

                    let provOpts = '';
                    for (const [k, v] of Object.entries(CompanyModule.providers)) {
                        const isSel = co.providerId === k;
                        provOpts += `<div class="selection-card ${isSel ? 'selected' : ''}" onclick="setStrat('provider', '${k}')">
                                <strong>${v.name}</strong><br>Coste: x${v.priceMod}<br>Calidad: ${(v.quality * 100).toFixed(0)}%
                            </div>`;
                    }

                    tabContent.innerHTML = `
                            <div class="strategy-section">
                                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:25px;">
                                    <div class="card" style="padding:15px; border:1px solid #334155;">
                                        <h4>🏷️ Estrategia de Precio</h4>
                                        <p style="font-size:0.85rem; color:#94a3b8; margin-bottom:5px;">Base Mercado: ${formatCurrency(baseTicket)}</p>
                                        <p style="font-size:0.85rem; color:#facc15; margin-bottom:10px;">Equilibrio (Rep. ${co.reputation.toFixed(1)}): <strong>${formatCurrency(equiPrice)}</strong></p>
                                        <div style="display:flex; align-items:center; gap:10px;">
                                            <input type="number" id="price-input" value="${currentPrice}" step="0.5" style="padding:5px; border-radius:4px; border:1px solid #475569; background:#0f172a; color:white; width:80px;">
                                            <button onclick="updatePrice()" class="btn-sm" style="background:var(--accent-color); color:black;">Fijar</button>
                                        </div>
                                    </div>
                                    <div class="card" style="padding:15px; border:1px solid ${qColor}; background:rgba(15, 23, 42, 0.5);">
                                        <h4>📊 Análisis de Reputación</h4>
                                        <div style="font-size:0.8rem; margin-bottom:10px;">
                                            <div style="display:flex; justify-content:space-between; border-bottom:1px solid #334155; padding-bottom:2px; margin-bottom:5px;">
                                                <span>Calidad Real:</span>
                                                <strong>${(stats.actualQuality * 100).toFixed(0)}%</strong>
                                            </div>
                                            <div style="color:#94a3b8; margin-bottom:5px; padding-left:10px;">
                                                • Base Proveedor: ${(curProv.quality * 100).toFixed(0)}%<br>
                                                • Bonus I+D (Nvl ${co.productLevel}): +${((co.productLevel - 1) * 5).toFixed(0)}%
                                            </div>

                                            <div style="display:flex; justify-content:space-between; border-bottom:1px solid #334155; padding-bottom:2px; margin-bottom:5px;">
                                                <span>Exingencia (Precio):</span>
                                                <strong>${(stats.requiredQuality * 100).toFixed(0)}%</strong>
                                            </div>
                                            <div style="color:#94a3b8; margin-bottom:5px; padding-left:10px;">
                                                • Base Mercado: 70%<br>
                                                • Ajuste Precio: ${((stats.requiredQuality - 0.70) * 100).toFixed(0)}%
                                            </div>
                                        </div>
                                        <div style="text-align:center; padding-top:5px; border-top:1px solid #334155;">
                                            <p style="margin-bottom:0px;">Objetivo Reputación: <strong>${stats.targetRep ? stats.targetRep.toFixed(2) : '3.50'}</strong></p>
                                            <p style="color:${qColor}; font-weight:bold; font-size:0.9rem; margin-top:2px;">${qText}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <h3 style="border-bottom:1px solid #334155; padding-bottom:5px; margin-bottom:15px;">📦 Proveedores (Insumos)</h3>
                                <div class="options-grid" style="margin-bottom:20px;">${provOpts}</div>

                                <h3 style="border-bottom:1px solid #334155; padding-bottom:5px; margin-bottom:15px;">🚀 Desarrollo de Producto</h3>
                                <div class="invest-grid">
                                    <div class="invest-card">
                                        <h4>Producto (Nivel ${co.productLevel})</h4>
                                        <p>Mejora calidad (+5%) y satisfacción.</p>
                                        <button onclick="investCo('product_dev')">Invertir (${formatCurrency(co.productLevel * 5000)})</button>
                                    </div>
                                </div>
                            </div>
                        `;

                    // window.attachProductHandlers(); // Removed (undefined)

                } else if (activeTab === 'marketing') {
                    const stats = co.lastStats || {};
                    const comp = stats.demandComposition || { base: 0, traffic: 1, marketing: 1, reputation: 1, organic: 1 };

                    let mktOpts = '';
                    for (const [k, v] of Object.entries(CompanyModule.marketingChannels)) {
                        const isSel = co.marketingChannel === k;
                        mktOpts += `<div class="selection-card ${isSel ? 'selected' : ''}" onclick="setStrat('marketing', '${k}')">
                                <strong>${v.name}</strong><br>Coste: ${formatCurrency(v.cost)}/mes<br>Impacto: x${v.impact}
                            </div>`;
                    }

                    const strategyHTML = `
                                <div class="strategy-section">
                                    <h3 style="border-bottom:1px solid #334155; padding-bottom:5px; margin-bottom:15px;">📡 Canales de Publicidad</h3>
                                    <div class="options-grid" style="margin-bottom:20px;">${mktOpts}</div>

                                    <div style="background:#1e293b; padding:15px; border-radius:8px; font-size:0.9rem; margin-bottom:20px; border:1px dashed #334155;">
                                        <h4 style="margin-top:0; color:#38bdf8;">📈 Análisis de Demanda</h4>
                                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                                            <div>Base: <strong>${comp.base}</strong></div>
                                            <div>Tráfico: <strong>x${comp.traffic.toFixed(2)}</strong></div>
                                            <div>Marketing: <strong>x${comp.marketing.toFixed(2)}</strong></div>
                                            <div>Reputación: <strong>x${comp.reputation.toFixed(2)}</strong></div>
                                            <div>Orgánico: <strong>x${comp.organic.toFixed(2)}</strong></div>
                                            <div style="color:#facc15;">Volatilidad (Azar): <strong>x${(comp.volatility || 1).toFixed(2)}</strong></div>
                                            <div style="grid-column: 1 / -1; border-top:1px solid #334155; margin-top:5px; padding-top:5px;">
                                                Total Estimado: <strong style="color:var(--success-color);">${stats.demand || 0} clientes/mes</strong>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 style="border-bottom:1px solid #334155; padding-bottom:5px; margin-bottom:15px;">🚀 Infraestructura de Marketing</h3>
                                    <div class="invest-grid">
                                        <div class="invest-card">
                                            <h4>Marketing (Nivel ${co.marketingLevel})</h4>
                                            <p>Potencia eficacia (+20%) de campañas.</p>
                                            <button onclick="investCo('marketing_infra')">Invertir (${formatCurrency(co.marketingLevel * 5000)})</button>
                                        </div>
                                    </div>
                                </div>
                            `;
                    tabContent.innerHTML = strategyHTML;

                    // Functions moved to shared scope above


                } else if (activeTab === 'finance') {
                    tabContent.innerHTML = `
                                <div class="finance-actions">
                                 <h3>Movimientos de Caja</h3>
                                 <div class="control-group">
                                     <label>Retirar Fondos a Cuenta Personal</label>
                                     <div style="display:flex; gap:10px;">
                                         <input type="number" id="co-trans-amount" placeholder="Cantidad" style="width:150px;">
                                         <button id="btn-withdraw">Retirar</button>
                                     </div>
                                 </div>
                                 <div class="control-group">
                                     <label>Inyectar Capital Personal</label>
                                     <div style="display:flex; gap:10px;">
                                         <input type="number" id="co-dep-amount" placeholder="Cantidad" style="width:150px;">
                                         <button id="btn-deposit">Ingresar</button>
                                     </div>
                                 </div>

                                 <h3 style="margin-top:20px;">Salario del CEO</h3>
                                 <div class="control-group">
                                     <p>Tu sueldo mensual (Cubre tus gastos personales)</p>
                                     <div style="display:flex; gap:10px;">
                                         <input type="number" id="co-ceo-salary" value="${co.ceoSalary || 0}" style="width:150px;">
                                         <button id="btn-set-salary">Actualizar</button>
                                     </div>
                                 </div>

                                 <h3 style="margin-top:20px; color:var(--danger-color)">Zona de Peligro</h3>
                                 <button onclick="sellCompanyAction()" style="background:var(--danger-color); color:white; border:none; padding:10px; width:100%;">VENDER EMPRESA (EXIT)</button>
                             </div>
            `;

                    document.getElementById('btn-withdraw').onclick = () => {
                        const val = parseInt(document.getElementById('co-trans-amount').value);
                        if (!val || val <= 0) return alert('Introduce cantidad válida');
                        let r = CompanyModule.withdraw(val);
                        if (r) alert(r.message);
                        UI.updateJob(JobSystem);
                        UI.updateHeader();
                    };
                    document.getElementById('btn-deposit').onclick = () => {
                        const val = parseInt(document.getElementById('co-dep-amount').value);
                        if (!val || val <= 0) return alert('Introduce cantidad válida');
                        let r = CompanyModule.deposit(val);
                        if (r) alert(r.message);
                        UI.updateJob(JobSystem);
                        UI.updateHeader();
                    };
                    document.getElementById('btn-set-salary').onclick = () => {
                        const val = parseInt(document.getElementById('co-ceo-salary').value) || 0;
                        co.ceoSalary = val;
                        alert(`Salario de CEO actualizado a ${formatCurrency(val)} `);
                        UI.updateJob(JobSystem);
                    };
                    window.sellCompanyAction = () => {
                        const r = CompanyModule.sellCompany();
                        if (r && r.success) {
                            alert(r.message);
                            UI.updateHeader();
                            UI.updateJob(JobSystem);
                            UI.updateDashboard();
                        }
                    };
                }
            }
        } catch (e) {
            console.error("UI Error:", e);
            alert("UI Error: " + e.message);
        }
    },

    checkStoryEvents() {
        // console.log(`DEBUG: Checking Story Events. Year: ${GameState.year}, Month: ${GameState.month}`);

        // EVENT 1: Year 1, Month 4
        if (GameState.year === 1 && GameState.month === 4) {
            GameState.cash += 300;
            UI.showModal('🎂 ¡Felicidades!', 'Tu familia te envía un regalo de cumpleaños.<br><br><strong>+300€</strong> añadidos a tu cartera.', [{ text: '¡Gracias!', style: 'primary' }]);
            UI.playCoinSound();
        }

        // EVENT 2A: Year 2, Month 3 - Silent Unlock
        if (GameState.year === 2 && GameState.month === 3) {
            GameState.expensesUnlocked = true;
            // Notification removed as requested
        }

        // EVENT 2B: Year 2, Month 4 - Kicked out
        if (GameState.year === 2 && GameState.month === 4) {
            GameState.cash += 300;

            // Simplified Logic (Matching Y1M4 stability)
            // No forced housing change to avoid crashes

            UI.showModal('🎂 Felicidades... y Adiós', 'Tu familia te envía <strong>300€</strong> por tu cumpleaños, pero hay un mensaje extra:<br><br><em>"Hijo, ya vas siendo mayor. Cómprate algo bonito, pero espabila y busca curro porque mañana usamos tu habitación para el gimnasio. ¡Te vas de casa!"</em><br><br>📉 <strong>Tutorial de Gastos</strong><br>Debes elegir tu nueva vivienda ahora mismo. Por suerte, tienes un amigo con un sofá libre.<br><br><strong>Misión: Selecciona "Sofá de un amigo" en la pestaña Gastos.</strong>', [
                {
                    text: 'Ir a buscar piso', style: 'danger', fn: () => {
                        GameState.tutorialState.forceHousing = true;
                        // Switch view manually
                        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
                        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                        document.getElementById('lifestyle-view').classList.add('active');
                        document.querySelector(`button[data-view="lifestyle"]`).classList.add('active');
                        UI.updateLifestyle(LifestyleModule);
                    }
                }
            ]);
            UI.playCoinSound();
        }
    }
};
function nextTurn() {
    StockMarket.nextTurn();
    RealEstate.nextTurn(); // Dynamic prices
    Bank.nextTurn();
    // JobSystem.nextTurn(); // Moved below to ensure salary is paid before expiry
    EducationModule.nextTurn(); // Study progress
    CompanyModule.nextTurn(); // Company Progress

    // Dynamic Expenses
    if (GameState.lifestyle) {
        GameState.expenses = LifestyleModule.calculateTotal();
    }

    const rentIncome = GameState.inventory.realEstate.reduce((acc, p) => acc + p.monthlyRent, 0);
    const netIncome = GameState.salary + rentIncome - GameState.expenses;
    GameState.cash += netIncome;

    // TRACK ANNUAL INCOME FOR TAXES
    if (!GameState.currentYearIncome) {
        GameState.currentYearIncome = { salary: 0, rental: 0, stocks: 0, company: 0 };
    }

    // DEFENSIVE INIT FOR LIFETIME STATS (for old save games)
    if (!GameState.lifetimeStats) {
        GameState.lifetimeStats = {
            totalIncome: { salary: 0, rental: 0, stocks: 0, company: 0 },
            totalExpenses: { lifestyle: 0, housing: 0, education: 0 },
            totalTaxesPaid: 0
        };
    }

    if (GameState.salary > 0) {
        GameState.currentYearIncome.salary += GameState.salary;
        // LIFETIME TRACKING
        GameState.lifetimeStats.totalIncome.salary += GameState.salary;
    }
    if (rentIncome > 0) {
        GameState.currentYearIncome.rental += rentIncome;
        // LIFETIME TRACKING
        GameState.lifetimeStats.totalIncome.rental += rentIncome;
    }
    // LIFETIME EXPENSE TRACKING
    if (GameState.expenses > 0) {
        GameState.lifetimeStats.totalExpenses.lifestyle += GameState.expenses;
    }
    // Stock gains are tracked when selling
    // Company profits are tracked in Company Module.nextTurn

    // PROGRESSIVE COMMUNIST EXPROPRIATION SYSTEM
    let expropriationTriggered = false;
    let expropriationAmount = 0;
    let expropriationPercent = 0;
    let expropriationMessage = '';

    // Tier 4: 6 Million or more - 90% (RECURRING)
    if (GameState.cash >= 6000000) {
        expropriationPercent = 0.90;
        expropriationAmount = Math.floor(GameState.cash * expropriationPercent);
        GameState.cash -= expropriationAmount;
        expropriationTriggered = true;
        expropriationMessage = `¡ATENCIÓN CIUDADANO!<br><br>El Comité Central ha detectado que posees una cantidad <strong>obscena</strong> de capital (${formatCurrency(GameState.cash + expropriationAmount)}).<br><br>En nombre de la <strong>igualdad social</strong>, procedemos a <strong>redistribuir el 90%</strong> (${formatCurrency(expropriationAmount)}) entre... ehh... proyectos del partido.<br><br>🚩 ¡Viva la revolución!`;
    }
    // Tier 3: 3 Million - 70% (ONCE)
    else if (GameState.cash >= 3000000 && !GameState.expropriation3MDone) {
        expropriationPercent = 0.70;
        expropriationAmount = Math.floor(GameState.cash * expropriationPercent);
        GameState.cash -= expropriationAmount;
        GameState.expropriation3MDone = true;
        expropriationTriggered = true;
        expropriationMessage = `Estimado "camarada"...<br><br>Hemos notado que tu cuenta bancaria parece la de un <strong>burgués capitalista</strong>. Esto no puede ser.<br><br>El Estado de Sergio ha aprobado una <strong>"contribución solidaria obligatoria"</strong> del 70% (${formatCurrency(expropriationAmount)}).<br><br>Tranquilo, lo usaremos para... cosas. Importantes. Probablemente.`;
    }
    // Tier 2: 1 Million - 60% (ONCE)
    else if (GameState.cash >= 1000000 && !GameState.expropriation1MDone) {
        expropriationPercent = 0.60;
        expropriationAmount = Math.floor(GameState.cash * expropriationPercent);
        GameState.cash -= expropriationAmount;
        GameState.expropriation1MDone = true;
        expropriationTriggered = true;
        expropriationMessage = `¡Felicidades! Has alcanzado el <strong>millón de euros</strong>.<br><br>Lástima que en el Estado de Sergio eso sea considerado <strong>"riqueza indecente"</strong>.<br><br>Se te aplicará un <strong>"ajuste patrimonial"</strong> del 60% (${formatCurrency(expropriationAmount)}) para financiar... ehh... la nueva estatua de Sergio. Es muy grande.`;
    }
    // Tier 1: 500k - 50% (ONCE)
    else if (GameState.cash >= 500000 && !GameState.expropriation500kDone) {
        expropriationPercent = 0.50;
        expropriationAmount = Math.floor(GameState.cash * expropriationPercent);
        GameState.cash -= expropriationAmount;
        GameState.expropriation500kDone = true;
        expropriationTriggered = true;
        expropriationMessage = `Lamentablemente en el juego de Sergio gobierna el <strong>comunismo</strong>... y piensa que tienes demasiado dinero.<br><br>El estado ha decidido <strong>expropiarte el 50%</strong> de tu dinero (${formatCurrency(expropriationAmount)}) para gastárselo en... bueno, que somos el estado no tenemos que darte explicaciones.`;
    }

    // Show expropriation modal if triggered
    if (expropriationTriggered) {
        setTimeout(() => {
            UI.showModal(
                '☭ Expropiación del Estado',
                expropriationMessage,
                [{ text: '😢 Entendido', style: 'danger', fn: null }]
            );
        }, 500);
    }

    JobSystem.nextTurn(); // Run here to handle job expiry AFTER pay

    // TAX SYSTEM
    // Warning in Month 1, Year 4
    if (GameState.year === 4 && GameState.month === 1 && !GameState.taxWarningShown) {
        GameState.taxWarningShown = true;
        setTimeout(() => {
            UI.showModal(
                '📋 Aviso Importante: Impuestos',
                `Esto es un <strong>simulador real</strong>... toca pagar impuestos al Estado de Sergio.<br><br>Se le informa que a partir de ahora el <strong>mes 5 de cada año</strong> deberá presentar la <strong>Declaración de la Renta</strong> y pagar impuestos, por lo que deberá <strong>reservar dinero en el banco</strong> para ello.<br><br><strong>Tramos impositivos progresivos:</strong><br>• Menos de 10.000€: 10%<br>• De 10.000€ a 25.000€: 15%<br>• De 25.000€ a 50.000€: 25%<br>• De 50.000€ a 100.000€: 35%<br>• Más de 100.000€: 45%`,
                [{ text: 'Entendido', style: 'primary', fn: null }]
            );
        }, 800);
    }

    // Tax Declaration in Month 5 (starting year 4)
    if (GameState.year >= 4 && GameState.month === 5) {
        if (!GameState.previousYearIncome) {
            GameState.previousYearIncome = { salary: 0, rental: 0, stocks: 0, company: 0 };
        }

        const totalIncome =
            GameState.previousYearIncome.salary +
            GameState.previousYearIncome.rental +
            GameState.previousYearIncome.stocks +
            GameState.previousYearIncome.company;

        // PROGRESSIVE TAX SYSTEM
        function calculateTaxRate(income) {
            if (income < 10000) return 0.10;
            if (income < 25000) return 0.15;
            if (income < 50000) return 0.25;
            if (income < 100000) return 0.35;
            return 0.45; // 100k or more
        }

        const taxRate = calculateTaxRate(totalIncome);
        const taxAmount = Math.floor(totalIncome * taxRate);

        if (totalIncome > 0) {
            GameState.cash -= taxAmount;
            // LIFETIME TAX TRACKING
            GameState.lifetimeStats.totalTaxesPaid += taxAmount;

            const breakdown = `
                        <div style="text-align: left; margin: 10px 0;">
                            <h4 style="margin-bottom: 10px; color: #38bdf8; font-size: 1rem;">Ingresos Año ${GameState.year - 1}:</h4>
                            <div style="margin-bottom: 5px; font-size: 0.9rem;">💼 Salarios: <strong>${formatCurrency(GameState.previousYearIncome.salary)}</strong></div>
                            <div style="margin-bottom: 5px; font-size: 0.9rem;">🏠 Alquileres: <strong>${formatCurrency(GameState.previousYearIncome.rental)}</strong></div>
                            <div style="margin-bottom: 5px; font-size: 0.9rem;">📈 Bolsa: <strong>${formatCurrency(GameState.previousYearIncome.stocks)}</strong></div>
                            <div style="margin-bottom: 5px; font-size: 0.9rem;">🏢 Empresa: <strong>${formatCurrency(GameState.previousYearIncome.company)}</strong></div>
                            <hr style="margin: 10px 0; border-color: #334155;">
                            <div style="font-size: 1rem; margin-bottom: 5px;">Total: <strong style="color: #4ade80;">${formatCurrency(totalIncome)}</strong></div>
                            <div style="font-size: 0.85rem; margin-bottom: 5px; color: #94a3b8;">Tramo: ${(taxRate * 100).toFixed(0)}%</div>
                            <div style="font-size: 1.1rem; margin-top: 8px; color: #f87171;">Impuestos: <strong>${formatCurrency(taxAmount)}</strong></div>
                        </div>
                    `;

            UI.showModal(
                'Renta Año ' + (GameState.year - 1),
                breakdown,
                [{ text: 'Pagar 💸', style: 'danger', fn: null }]
            );
        }
    }

    GameState.month++;
    if (GameState.month > 12) {
        GameState.month = 1;
        GameState.year++;
        GameState.age++; // Birthday!

        // CHECK FOR YEAR 50 ENDGAME
        if (GameState.year > 50) {
            setTimeout(() => showEndgameModal(), 500);
            return; // Stop game progression
        }

        // ASSIGN NEW ANNUAL STOCK TARGETS
        StockMarket.assignAnnualTargets();

        // RESET ANNUAL INCOME TRACKING
        if (!GameState.previousYearIncome) {
            GameState.previousYearIncome = { salary: 0, rental: 0, stocks: 0, company: 0 };
        }
        GameState.previousYearIncome = { ...GameState.currentYearIncome };
        GameState.currentYearIncome = { salary: 0, rental: 0, stocks: 0, company: 0 };
    }

    UI.checkStoryEvents(); // CHECK EVENTS

    if (GameState.month % 6 === 0) {
        RealEstate.generateListings();
        // Auto-Save
        const saveRes = PersistenceModule.saveGame();
        console.log("Auto-Save:", saveRes.message);
    }

    // History & Chart
    const nw = updateNetWorth();

    // GAMIFICATION: MILESTONE CONFETTI
    const milestones = [5000, 50000, 100000, 500000, 1000000];
    if (!GameState.achievedMilestones) GameState.achievedMilestones = []; // Safety init for old saves

    milestones.forEach(m => {
        if (nw >= m && !GameState.achievedMilestones.includes(m)) {
            GameState.achievedMilestones.push(m);
            UI.triggerConfetti();
            UI.showToast('¡HITO DESBLOQUEADO!', `Has alcanzado tus primeros ${formatCurrency(m)} de Patrimonio.`, 'success');
            // Add a small bonus? No, visual only for now.
        }
    });

    let totalDebt = 0;
    GameState.loans.forEach(l => totalDebt += l.remainingBalance);
    let assetsOnly = nw + totalDebt; // Roughly

    GameState.history.netWorth.push(nw);
    GameState.history.cash.push(GameState.cash);
    GameState.history.debt.push(totalDebt);
    GameState.history.assets.push(assetsOnly);
    GameState.history.labels.push(`${GameState.month}/${GameState.year}`);

    // Max 24 points to keep it clean? Or scrollable. Canvas resizes fine. 
    // If dragging too long, slice.
    if (GameState.history.netWorth.length > 50) {
        GameState.history.netWorth.shift();
        GameState.history.cash.shift();
        GameState.history.debt.shift();
        GameState.history.assets.shift();
        GameState.history.labels.shift();
    }

    UI.render();
}




// INIT
try {
    console.log('Juego iniciado (Script Try Block Start)');
    const setupEventListeners = () => {
        // Next Turn Buttons (Header and Dashboard)
        const nextBtns = document.querySelectorAll('#next-turn-btn, button[onclick*="nextTurn"]');
        // Since ID should be unique, I'll select by ID and maybe the dashboard one needs a class? 
        // For now, I'll select all buttons with text 'Siguiente Mes' or similar if IDs are messy, 
        // but usually I can just getById if unique. 
        // Found duplicate IDs in valid HTML check. I will queryAll by ID [id="next-turn-btn"]
        document.querySelectorAll('[id="next-turn-btn"]').forEach(btn => {
            btn.onclick = () => {
                const prevCash = GameState.cash;
                nextTurn();
                const diff = GameState.cash - prevCash;
                UI.showTurnFeedback(diff);
            };
        });

        // Stock Market
        const btnBuy = document.getElementById('btn-buy');
        if (btnBuy) btnBuy.onclick = () => {
            const symbol = document.getElementById('stock-select').value;
            const amount = parseInt(document.getElementById('trade-amount').value);
            const feedback = document.getElementById('trade-feedback');
            const res = StockMarket.buyStock(symbol, amount);
            feedback.textContent = res.message;
            feedback.className = res.success ? 'success-msg' : 'error-msg';
            if (res.success) {
                UI.updateMarket();
                UI.updateHeader();
            }
        };

        const btnSell = document.getElementById('btn-sell');
        if (btnSell) btnSell.onclick = () => {
            const symbol = document.getElementById('stock-select').value;
            const amount = parseInt(document.getElementById('trade-amount').value);
            const feedback = document.getElementById('trade-feedback');
            const res = StockMarket.sellStock(symbol, amount);
            feedback.textContent = res.message;
            feedback.className = res.success ? 'success-msg' : 'error-msg';
            if (res.success) {
                UI.updateMarket();
                UI.updateHeader();
            }
        };

        // Bank
        const btnLoan = document.getElementById('btn-request-loan');
        if (btnLoan) btnLoan.onclick = () => {
            const amount = parseInt(document.getElementById('loan-amount').value);
            const years = parseInt(document.getElementById('loan-years').value);
            const feedback = document.getElementById('bank-feedback');
            const res = Bank.takeLoan(amount, years);
            feedback.textContent = res.message;
            feedback.className = res.success ? 'success-msg' : 'error-msg';
            if (res.success) {
                UI.updateBank(Bank);
                UI.updateHeader();
            }
        };

        // Loan Slider
        const slider = document.getElementById('loan-years');
        if (slider) {
            slider.oninput = (e) => {
                document.getElementById('loan-years-display').textContent = e.target.value + ' años';
                Bank.calculateLoanPayment();
            };
            document.getElementById('loan-amount').oninput = () => Bank.calculateLoanPayment();
        }

        // Job
        const btnPromote = document.getElementById('btn-promote');
        if (btnPromote) btnPromote.onclick = () => {
            const res = JobSystem.promote();
            alert(res.message);
            if (res.success) {
                UI.updateJob(JobSystem);
                UI.updateHeader();
            }
        };

        // Modals
        document.querySelectorAll('.close').forEach(btn => {
            btn.onclick = () => {
                btn.closest('.modal').style.display = 'none';
            };
        });

        // Window click to close modals
        window.onclick = (event) => {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = "none";
            }
        };
    };

    const initGame = () => {
        console.log('DEBUG: initGame() CALLED');
        StockMarket.init();
        UI.render();
        setupEventListeners();

        // Sync Bottom Nav
        // Sync Bottom Nav
        document.querySelectorAll('.b-nav-item').forEach(btn => {
            btn.onclick = () => {
                const view = btn.dataset.view;
                console.log('DEBUG: Bottom Nav Clicked', view);
                UI.showView(view);
            };
        });

        // Sync Desktop Nav to Bottom Nav
        document.getElementById('main-nav').querySelectorAll('.nav-btn').forEach(btn => {
            const originalClick = btn.onclick; // Preserving if any (though usually handled by event delegation or loop below)
            btn.onclick = () => {
                const view = btn.dataset.view;
                UI.showView(view);

                // Sync Bottom Nav
                document.querySelectorAll('.b-nav-item').forEach(b => {
                    b.classList.remove('active');
                    if (b.dataset.view === view) b.classList.add('active');
                });
            }
        });

        // Hack to force initial job display update and ChartTick
        setTimeout(() => {
            try {
                UI.updateJob(JobSystem);
                UI.updateDashboard();
            } catch (e) {
                console.error('Async Init Error:', e);
            }
        }, 100);
    };

    // STARTUP LOGIC
    if (PersistenceModule.checkSave()) {
        const allSaves = PersistenceModule.getAllSaves();

        const renderSaveSlot = (save) => {
            const dateStr = save.savedAt ? new Date(save.savedAt).toLocaleString('es-ES', {
                day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
            }) : '';
            return `
                <div class="load-slot-card" data-key="${save.key}">
                    <div class="slot-badge ${save.isAuto ? 'auto' : 'manual'}">${save.isAuto ? '🔄 Auto' : '💾'}</div>
                    <div class="slot-player">🎮 ${save.playerName}</div>
                    <div class="slot-details">
                        <span class="slot-money">💰 ${formatCurrency(save.cash)}</span>
                        <span>📅 Año ${save.year}, Mes ${save.month}</span>
                    </div>
                    ${dateStr ? `<div class="slot-date">⏰ ${dateStr}</div>` : ''}
                    <button class="btn-load-slot" data-key="${save.key}">▶️ Cargar</button>
                </div>
            `;
        };

        const msg = `
            <style>
                .custom-modal-box h3 { display: none !important; }
                .custom-modal-box .modal-body { padding: 0 !important; }
                .custom-modal-box { max-width: 440px !important; border-radius: 24px !important; overflow: hidden !important; border: 1px solid #334155 !important; }
                .welcome-back-container { padding: 25px; text-align: center; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); border-radius: 24px; max-height: 80vh; overflow-y: auto; }
                .welcome-icon { font-size: 3rem; margin-bottom: 10px; display: block; animation: pulse 2s ease-in-out infinite; }
                @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
                .welcome-title { color: #38bdf8; margin: 0 0 5px; font-size: 1.3rem; font-weight: 700; }
                .welcome-subtitle { color: #94a3b8; font-size: 0.85rem; margin-bottom: 15px; }
                .saves-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; }
                .load-slot-card { background: rgba(30, 41, 59, 0.8); border: 1px solid #334155; border-radius: 12px; padding: 12px; text-align: left; position: relative; transition: border-color 0.2s; }
                .load-slot-card:hover { border-color: #38bdf8; }
                .slot-badge { position: absolute; top: -6px; right: 10px; background: #1e293b; padding: 2px 8px; border-radius: 8px; font-size: 0.65rem; font-weight: 600; }
                .slot-badge.auto { color: #4ade80; border: 1px solid #4ade80; }
                .slot-badge.manual { color: #38bdf8; border: 1px solid #38bdf8; }
                .slot-player { font-size: 1rem; font-weight: 700; color: #fbbf24; margin-bottom: 5px; }
                .slot-details { display: flex; gap: 12px; font-size: 0.8rem; color: #e2e8f0; margin-bottom: 4px; flex-wrap: wrap; }
                .slot-money { color: #4ade80; font-weight: 600; }
                .slot-date { font-size: 0.7rem; color: #64748b; margin-bottom: 8px; }
                .btn-load-slot { width: 100%; padding: 8px; background: linear-gradient(135deg, #4ade80, #22c55e); border: none; border-radius: 6px; color: #0f172a; font-weight: 700; cursor: pointer; font-size: 0.85rem; }
                .btn-load-slot:hover { transform: scale(1.02); }
                .btn-new-game { width: 100%; padding: 12px; font-size: 0.95rem; font-weight: 600; border-radius: 10px; border: 2px solid #475569; cursor: pointer; background: transparent; color: #94a3b8; transition: all 0.2s; }
                .btn-new-game:hover { border-color: #f87171; color: #f87171; }
                @media (max-width: 480px) { .welcome-back-container { padding: 20px 15px; } .welcome-icon { font-size: 2.5rem; } }
            </style>
            <div class="welcome-back-container">
                <span class="welcome-icon">👋</span>
                <h2 class="welcome-title">¡Bienvenido de nuevo!</h2>
                <p class="welcome-subtitle">Selecciona una partida</p>
                <div class="saves-list">${allSaves.map(renderSaveSlot).join('')}</div>
                <button id="btn-new-game-saved" class="btn-new-game">🔄 Nueva Partida</button>
            </div>
        `;

        UI.showModal('Bienvenido de nuevo', msg, [], true);

        document.querySelectorAll('.btn-load-slot').forEach(btn => {
            btn.onclick = () => {
                const key = btn.dataset.key;
                document.querySelector('.custom-modal-overlay').remove();
                PersistenceModule.loadFromSlot(key);
                initGame();
            };
        });

        document.getElementById('btn-new-game-saved').onclick = () => {
            if (confirm('¿Iniciar nueva partida?')) {
                document.querySelector('.custom-modal-overlay').remove();
                promptNewUser(initGame);
            }
        };
    } else {
        promptNewUser(initGame);
    }

    function promptNewUser(callback) {
        const msg = `
                    <style>
                        .custom-modal-footer, .modal-actions { display: none !important; }
                        .custom-modal-box h3 { display: none !important; }
                        .custom-modal-box .modal-body { padding: 0 !important; }
                        .custom-modal-box { 
                            max-width: 420px !important; 
                            border-radius: 24px !important;
                            overflow: hidden !important;
                            border: 1px solid #334155 !important;
                        }
                        .profile-create-container {
                            padding: 30px;
                            text-align: center;
                            background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
                            border-radius: 24px;
                        }
                        .profile-rocket {
                            font-size: 4rem;
                            margin-bottom: 10px;
                            display: block;
                            animation: rocketBounce 2s ease-in-out infinite;
                        }
                        @keyframes rocketBounce {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-10px); }
                        }
                        .profile-title {
                            color: #38bdf8;
                            margin: 0 0 15px 0;
                            font-size: 1.5rem;
                            font-weight: 700;
                        }
                        .profile-features {
                            background: rgba(56, 189, 248, 0.1);
                            border: 1px solid rgba(56, 189, 248, 0.2);
                            border-radius: 12px;
                            padding: 15px;
                            margin-bottom: 20px;
                            text-align: left;
                        }
                        .profile-features p {
                            color: #e2e8f0;
                            font-size: 0.9rem;
                            line-height: 1.8;
                            margin: 0;
                        }
                        .profile-input-group {
                            margin-bottom: 20px;
                        }
                        .profile-input-group label {
                            display: block;
                            color: #94a3b8;
                            font-size: 0.85rem;
                            margin-bottom: 8px;
                            text-align: left;
                        }
                        .profile-input-group input {
                            width: 100%;
                            padding: 14px;
                            background: #0f172a;
                            border: 2px solid #334155;
                            color: white;
                            border-radius: 10px;
                            font-size: 1rem;
                            transition: border-color 0.2s;
                            box-sizing: border-box;
                        }
                        .profile-input-group input:focus {
                            outline: none;
                            border-color: #38bdf8;
                        }
                        .profile-start-btn {
                            width: 100%;
                            padding: 16px;
                            font-size: 1.1rem;
                            font-weight: 700;
                            border-radius: 10px;
                            border: none;
                            cursor: pointer;
                            background: linear-gradient(135deg, #38bdf8, #0ea5e9);
                            color: #0f172a;
                            margin-bottom: 15px;
                            transition: transform 0.1s, box-shadow 0.2s;
                            box-shadow: 0 4px 15px rgba(56, 189, 248, 0.3);
                        }
                        .profile-start-btn:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 6px 20px rgba(56, 189, 248, 0.4);
                        }
                        .profile-start-btn:active {
                            transform: scale(0.98);
                        }
                        .profile-tagline {
                            color: #fbbf24;
                            font-size: 0.85rem;
                            font-style: italic;
                            margin: 0;
                        }
                        /* MOBILE OPTIMIZATIONS */
                        @media (max-width: 480px) {
                            .custom-modal-box {
                                margin: 10px !important;
                                max-height: 90vh !important;
                            }
                            .profile-create-container {
                                padding: 20px 15px;
                            }
                            .profile-rocket {
                                font-size: 3rem;
                            }
                            .profile-title {
                                font-size: 1.3rem;
                            }
                            .profile-features p {
                                font-size: 0.85rem;
                                line-height: 1.6;
                            }
                            .profile-input-group input {
                                padding: 12px;
                            }
                            .profile-start-btn {
                                padding: 14px;
                                font-size: 1rem;
                            }
                        }
                    </style>
                    <div class="profile-create-container">
                        <span class="profile-rocket">🚀</span>
                        <h2 class="profile-title">¡Bienvenido a tu nueva vida!</h2>
                        
                        <div class="profile-features">
                            <p>
                                📚 <strong>Estudia</strong> para mejorar tus habilidades<br>
                                💼 <strong>Trabaja</strong> y asciende en tu carrera<br>
                                📈 <strong>Invierte</strong> en bolsa e inmuebles<br>
                                🏢 <strong>Crea tu negocio</strong> y llega a la cima
                            </p>
                        </div>
                        
                        <div class="profile-input-group">
                            <label>Tu Nombre</label>
                            <input type="text" id="start-player-name" placeholder="¿Cómo te llamas?">
                        </div>
                        
                        <button id="btn-start-game-custom" class="profile-start-btn">🎮 Empezar Aventura</button>
                        
                        <p class="profile-tagline">💰 Compra, vende, alquila... ¡Construye tu futuro!</p>
                    </div>
                `;

        UI.showModal('Crear Perfil', msg, [], true);

        // Quick fix: Remove the default footer if it exists
        const overlay = document.querySelector('.custom-modal-overlay');
        if (overlay) {
            const footer = overlay.querySelector('.custom-modal-footer, .modal-actions');
            if (footer) footer.style.display = 'none';
        }

        // Attach handler manually since we moved button to body
        document.getElementById('btn-start-game-custom').onclick = () => {
            const name = document.getElementById('start-player-name').value || 'Inversor';
            GameState.playerName = name;

            // Close modal manually (since we bypass default actions)
            const overlay = document.querySelector('.custom-modal-overlay');
            if (overlay) overlay.remove();

            callback();
            setTimeout(() => UI.startInitialTutorial(), 500);
        };
    }

} catch (e) {
    console.error('Critical Error loading save, resetting:', e);
    // Instead of alerting, just start fresh
    promptNewUser(initGame);
}

