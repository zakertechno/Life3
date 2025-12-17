import { GameState, updateNetWorth } from '../state.js';
import { StockMarket } from './stockMarket.js';

// Helper de formato
const formatCurrency = (amount) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
const formatPercent = (val) => (val * 100).toFixed(2) + '%';

export const UI = {
    elements: (() => {
        // Cachear elementos al inicio o mejor hacerlo lazy o en init. 
        // Por simplicidad buscamos en el documento
        return {
            date: document.getElementById('date-display'),
            money: document.getElementById('money-display'),
            netWorth: document.getElementById('net-worth'),
            monthlyIncome: document.getElementById('monthly-income'),
            monthlyExpenses: document.getElementById('monthly-expenses'),
            stocksGrid: document.getElementById('stocks-grid'),
            portfolioList: document.getElementById('portfolio-list'),
            stockSelect: document.getElementById('stock-select'),
            tradeFeedback: document.getElementById('trade-feedback')
        };
    })(),

    updateHeader() {
        const els = this.elements;
        // Re-query if lost (simple approach)
        if (!els.date) Object.assign(els, this.elements);

        document.getElementById('date-display').textContent = `Mes: ${GameState.month} | Año: ${GameState.year}`;
        document.getElementById('money-display').textContent = `Dinero: ${formatCurrency(GameState.cash)}`;
    },

    updateDashboard() {
        document.getElementById('net-worth').textContent = formatCurrency(updateNetWorth());
        document.getElementById('monthly-income').textContent = formatCurrency(GameState.salary);
        document.getElementById('monthly-expenses').textContent = formatCurrency(GameState.expenses);
    },

    updateMarket() {
        const grid = document.getElementById('stocks-grid');
        grid.innerHTML = '';

        StockMarket.stocks.forEach(stock => {
            const card = document.createElement('div');
            card.className = 'stock-card';

            const trendClass = stock.trend >= 0 ? 'trend-up' : 'trend-down';
            const trendSign = stock.trend >= 0 ? '+' : '';

            card.innerHTML = `
                <div class="stock-header">
                    <span class="stock-symbol">${stock.symbol}</span>
                    <span class="stock-price">${formatCurrency(stock.price)}</span>
                </div>
                <div class="stock-name">${stock.name}</div>
                <div class="stock-trend ${trendClass}">${trendSign}${formatPercent(stock.trend)}</div>
            `;

            // Click to select for trading
            card.addEventListener('click', () => {
                document.getElementById('stock-select').value = stock.symbol;
            });

            grid.appendChild(card);
        });

        this.updatePortfolio();
        this.updateTradeSelect();
    },

    updatePortfolio() {
        const list = document.getElementById('portfolio-list');
        list.innerHTML = '';

        if (GameState.inventory.stocks.length === 0) {
            list.innerHTML = '<p class="empty-msg">No tienes acciones.</p>';
            return;
        }

        GameState.inventory.stocks.forEach(item => {
            const currentStock = StockMarket.getStock(item.symbol);
            const currentValue = currentStock.price * item.quantity;
            const costBasis = item.avgPrice * item.quantity;
            const profit = currentValue - costBasis;
            const profitClass = profit >= 0 ? 'trend-up' : 'trend-down';

            const row = document.createElement('div');
            row.className = 'portfolio-item';
            row.innerHTML = `
                <div>${item.symbol} (${item.quantity})</div>
                <div>${formatCurrency(currentValue)}</div>
                <div class="${profitClass}">${formatCurrency(profit)}</div>
            `;
            list.appendChild(row);
        });
    },

    updateTradeSelect() {
        const select = document.getElementById('stock-select');
        // Mantener selección si existe
        const currentVal = select.value;
        select.innerHTML = '';

        StockMarket.stocks.forEach(stock => {
            const option = document.createElement('option');
            option.value = stock.symbol;
            option.textContent = `${stock.name} (${formatCurrency(stock.price)})`;
            select.appendChild(option);
        });

        if (currentVal) select.value = currentVal;
    },

    updateBank(BankModule) {
        // Update Limit
        const limit = BankModule.getMaxLoanAmount();
        document.getElementById('loan-limit').textContent = formatCurrency(limit);

        // Update Active Loans
        const list = document.getElementById('active-loans-list');
        list.innerHTML = '';

        if (GameState.loans.length === 0) {
            list.innerHTML = '<p class="empty-msg">No tienes préstamos activos.</p>';
        } else {
            GameState.loans.forEach(loan => {
                const card = document.createElement('div');
                card.className = 'loan-card';
                card.innerHTML = `
                    <div class="loan-header">
                        <span>${loan.type || 'Préstamo'}</span>
                        <span class="bad-debt">-${formatCurrency(loan.remainingBalance)}</span>
                    </div>
                    <div class="loan-details">
                        <p>Cuota: ${formatCurrency(loan.monthlyPayment)}/mes</p>
                        <p>Restante: ${loan.remainingMonths} meses</p>
                    </div>
                    ${loan.type !== 'Hipotecario' ? `<button class="btn-pay-all" data-id="${loan.id}">Pagar Todo</button>` : ''}
                `;

                // Event listener needs to be handled via delegation or here if we pass the handler
                // For simplicity, let's just leave the button and handle delegation in main.js or bind here if we had the logic
                // But UI shouldn't import Bank logic directly if we want decoupling. 
                // We'll let main.js handle clicks via delegation on the list container.

                list.appendChild(card);
            });
        }
    },

    updateRealEstate(REModule) {
        // Listings
        const grid = document.getElementById('property-listings');
        grid.innerHTML = '';

        REModule.availableProperties.forEach(prop => {
            const card = document.createElement('div');
            card.className = 'property-card';
            card.innerHTML = `
                <div class="property-img-placeholder">
                    <span>🏠</span>
                </div>
                <div class="property-info">
                    <h4>${prop.name}</h4>
                    <p class="prop-price">${formatCurrency(prop.price)}</p>
                    <div class="prop-details">
                        <p>Alquiler: ${formatCurrency(prop.monthlyRent)}/mes</p>
                        <p>Entrada (20%): ${formatCurrency(prop.price * prop.downPaymentPct)}</p>
                    </div>
                    <button class="btn-buy-prop" data-id="${prop.id}">Comprar</button>
                </div>
            `;
            grid.appendChild(card);
        });

        // My Properties
        const list = document.getElementById('my-properties-list');
        list.innerHTML = '';

        if (GameState.inventory.realEstate.length === 0) {
            list.innerHTML = '<p class="empty-msg">No tienes propiedades.</p>';
        } else {
            GameState.inventory.realEstate.forEach(prop => {
                const item = document.createElement('div');
                item.className = 'my-prop-item';
                item.innerHTML = `
                    <h4>${prop.name}</h4>
                    <p>Valor: ${formatCurrency(prop.price)}</p>
                    <p style="color: var(--success-color)">+${formatCurrency(prop.monthlyRent)}/mes</p>
                `;
                list.appendChild(item);
            });
        }
    },

    updateJob(JobModule) {
        document.getElementById('job-title-display').textContent = GameState.jobTitle;
        document.getElementById('job-salary-display').textContent = formatCurrency(GameState.salary);
        document.getElementById('job-exp-display').textContent = JobModule.monthsInCurrentJob;

        const nextJob = JobModule.getAvailablePromotions();
        const promoBtn = document.getElementById('btn-promote');
        const nextInfo = document.getElementById('next-job-info');

        if (nextJob) {
            nextInfo.innerHTML = `
                <strong>${nextJob.title}</strong><br>
                Salario: ${formatCurrency(nextJob.salary)}<br>
                Requisito: ${nextJob.reqMonths} meses exp (Tienes ${JobModule.monthsInCurrentJob})
            `;

            if (JobModule.monthsInCurrentJob >= nextJob.reqMonths) {
                promoBtn.disabled = false;
                promoBtn.textContent = 'Solicitar Ascenso';
            } else {
                promoBtn.disabled = true;
                promoBtn.textContent = `Faltan ${nextJob.reqMonths - JobModule.monthsInCurrentJob} meses`;
            }
        } else {
            nextInfo.textContent = 'Has alcanzado el máximo nivel en esta trayectoria.';
            promoBtn.disabled = true;
            promoBtn.textContent = 'Máximo Nivel';
        }
    },

    showFeedback(message, type = 'info') {
        const el = document.getElementById('trade-feedback');
        // Support bank feedback too if same element or create helper
        const bankEl = document.getElementById('bank-feedback');

        const target = (type === 'bank-error' || type === 'bank-success') ? bankEl : el;
        const className = (type === 'bank-error' || type === 'error') ? 'error' : 'success';

        if (target) {
            target.textContent = message;
            target.className = className;
            setTimeout(() => target.textContent = '', 3000);
        }
    },

    render() {
        this.updateHeader();
        this.updateDashboard();

        if (document.getElementById('market-view').classList.contains('active')) {
            this.updateMarket();
        }
        // We'll call updateBank explicitly when needed or if active
        if (document.getElementById('bank-view').classList.contains('active')) {
            // We need the Bank module instance or similar. 
            // Ideally render shouldn't depend on arguments too much.
            // We will handle this in main.js listener.
        }
    }
};
