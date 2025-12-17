import { GameState, updateNetWorth } from './state.js';
import { StockMarket, Portfolio } from './modules/stockMarket.js';
import { Bank } from './modules/bank.js';
import { RealEstate } from './modules/realEstate.js';
import { JobSystem } from './modules/job.js';
import { UI } from './modules/ui.js';

console.log('Juego de Inversión iniciado');

// Referencias DOM globales que se usan aqui
const dom = {
    nextTurnBtn: document.getElementById('next-turn-btn'),
    navBtns: document.querySelectorAll('.nav-btn'),
    views: document.querySelectorAll('.view'),
    btnBuy: document.getElementById('btn-buy'),
    btnSell: document.getElementById('btn-sell'),
    tradeAmount: document.getElementById('trade-amount'),
    stockSelect: document.getElementById('stock-select'),
    // Bank
    btnRequestLoan: document.getElementById('btn-request-loan'),
    inputLoanAmount: document.getElementById('loan-amount'),
    inputLoanYears: document.getElementById('loan-years'),
    displayLoanYears: document.getElementById('loan-years-display'),
    displayMonthlyPayment: document.getElementById('loan-monthly-payment'),
    activeLoansList: document.getElementById('active-loans-list'),
    // RE
    reListings: document.getElementById('property-listings'),
    // Job
    btnPromote: document.getElementById('btn-promote')
};

function init() {
    UI.render();
    setupEventListeners();
}

function setupEventListeners() {
    // Navigation
    dom.navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            dom.navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetView = btn.dataset.view;
            dom.views.forEach(view => {
                view.classList.remove('active');
                if (view.id === `${targetView}-view`) {
                    view.classList.add('active');
                    // Trigger specific view updates
                    if (targetView === 'market') UI.updateMarket();
                    if (targetView === 'bank') UI.updateBank(Bank);
                    if (targetView === 'real-estate') UI.updateRealEstate(RealEstate);
                    if (targetView === 'job') UI.updateJob(JobSystem);
                }
            });
        });
    });

    // Next Turn
    dom.nextTurnBtn.addEventListener('click', nextTurn);

    // Trading
    dom.btnBuy.addEventListener('click', () => handleTrade('buy'));
    dom.btnSell.addEventListener('click', () => handleTrade('sell'));

    // Bank
    dom.inputLoanYears.addEventListener('input', (e) => {
        dom.displayLoanYears.textContent = `${e.target.value} años`;
        updateLoanCalculator();
    });

    dom.inputLoanAmount.addEventListener('input', updateLoanCalculator);

    dom.btnRequestLoan.addEventListener('click', () => {
        const amount = parseInt(dom.inputLoanAmount.value);
        const years = parseInt(dom.inputLoanYears.value);

        const result = Bank.takeLoan(amount, years);
        UI.showFeedback(result.message, result.success ? 'bank-success' : 'bank-error');

        if (result.success) {
            UI.updateHeader();
            UI.updateBank(Bank);
        }
    });

    // Pay Loan Delegation
    dom.activeLoansList.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-pay-all')) {
            const id = parseInt(e.target.dataset.id);
            const result = Bank.payLoanTotally(id);
            if (result.success) {
                UI.updateHeader();
                UI.updateBank(Bank);
            }
            alert(result.message); // Simple alert for now or use feedback
        }
    });

    // Real Estate Buying Delegation
    dom.reListings.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-buy-prop')) {
            const id = parseInt(e.target.dataset.id);
            const result = RealEstate.buyProperty(id, true); // Always mortgage for now
            alert(result.message);

            if (result.success) {
                UI.updateHeader();
                UI.updateRealEstate(RealEstate);
                // Also update Bank if mortgage added
                UI.updateBank(Bank);
            }
        }
    });

    // Job
    dom.btnPromote.addEventListener('click', () => {
        const result = JobSystem.promote();
        alert(result.message);
        if (result.success) {
            UI.updateJob(JobSystem);
            UI.updateDashboard(); // Salary changed
        }
    });
}

function updateLoanCalculator() {
    const amount = parseInt(dom.inputLoanAmount.value) || 0;
    const years = parseInt(dom.inputLoanYears.value) || 1;
    const months = years * 12;
    const rate = Bank.INTEREST_RATES.personal / 12; // Mensual

    if (amount > 0) {
        const payment = (amount * rate) / (1 - Math.pow(1 + rate, -months));
        dom.displayMonthlyPayment.textContent = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(payment);
    } else {
        dom.displayMonthlyPayment.textContent = '0 €';
    }
}

function handleTrade(type) {
    const symbol = document.getElementById('stock-select').value;
    const amount = parseInt(document.getElementById('trade-amount').value);

    if (!symbol || amount <= 0) {
        UI.showFeedback('Selecciona una acción y cantidad válida', 'error');
        return;
    }

    let result;
    if (type === 'buy') {
        result = Portfolio.buy(symbol, amount, GameState);
    } else {
        result = Portfolio.sell(symbol, amount, GameState);
    }

    UI.showFeedback(result.message, result.success ? 'success' : 'error');
    if (result.success) {
        UI.updateHeader(); // Update Money
        UI.updateDashboard(); // Update Net Worth
        UI.updateMarket(); // Update Portfolio list
    }
}

function nextTurn() {
    // 1. Simulación de Mercado
    StockMarket.nextTurn();

    // 2. Banco (Cobros)
    Bank.nextTurn();

    // 3. Trabajo (Experiencia)
    JobSystem.nextTurn();

    // 4. Economía Personal (Salario + Alquileres)
    const rentIncome = GameState.inventory.realEstate.reduce((acc, p) => acc + p.monthlyRent, 0);
    const netIncome = GameState.salary + rentIncome - GameState.expenses;
    GameState.cash += netIncome;

    // 5. Tiempo
    GameState.month++;
    if (GameState.month > 12) {
        GameState.month = 1;
        GameState.year++;
    }

    // Regen properties sometimes
    if (GameState.month % 6 === 0) {
        RealEstate.generateListings();
    }

    // 6. Render Global
    updateNetWorth();
    UI.render();

    // Refresh active view if needed
    if (document.getElementById('market-view').classList.contains('active')) UI.updateMarket();
    if (document.getElementById('bank-view').classList.contains('active')) UI.updateBank(Bank);
    if (document.getElementById('real-estate-view').classList.contains('active')) UI.updateRealEstate(RealEstate);
    if (document.getElementById('job-view').classList.contains('active')) UI.updateJob(JobSystem);
}

// Start
init();
