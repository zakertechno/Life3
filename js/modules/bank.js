import { GameState } from '../state.js';

export const Bank = {
    // Tasas de interés anuales
    INTEREST_RATES: {
        personal: 0.12, // 12% anual
        mortgage: 0.04  // 4% anual
    },

    getMaxLoanAmount() {
        // Regla: La cuota mensual no debe superar el 40% del salario neto
        const netIncome = GameState.salary - GameState.expenses;
        const maxMonthlyPayment = netIncome * 0.40;

        // Estimación a 5 años (60 meses) para préstamo personal
        // Cuota = (P * r) / (1 - (1+r)^-n)
        // Simplificado: MaxPrestamo = Cuota * Terminos (aprox, ignorando interés compuesto inverso para limite rapido)
        // O mejor: P = (M * (1 - (1+r)^-n)) / r

        const r = this.INTEREST_RATES.personal / 12;
        const n = 60;
        const maxPrincipal = (maxMonthlyPayment * (1 - Math.pow(1 + r, -n))) / r;

        // Cap absoluto basado en patrimonio para evitar exploits
        const absoluteCap = Math.max(10000, GameState.netWorth * 2);

        return Math.min(Math.floor(maxPrincipal), absoluteCap);
    },

    takeLoan(amount, years) {
        if (amount <= 0) return { success: false, message: 'La cantidad debe ser mayor a 0' };

        const max = this.getMaxLoanAmount();
        if (amount > max) return { success: false, message: `El banco solo te presta hasta ${max}€` };

        const annualRate = this.INTEREST_RATES.personal;
        const monthlyRate = annualRate / 12;
        const termMonths = years * 12;

        // Fórmula de cuota constante (sistema francés)
        const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));

        const loan = {
            id: Date.now(),
            type: 'Personal',
            principal: amount,
            termMonths: termMonths,
            remainingMonths: termMonths,
            monthlyPayment: monthlyPayment,
            interestRate: annualRate,
            remainingBalance: amount
        };

        GameState.loans.push(loan);
        GameState.cash += amount;

        return { success: true, message: `Préstamo de ${amount}€ concedido. Cuota: ${monthlyPayment.toFixed(2)}€/mes` };
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
        // Cobrar cuotas
        let totalPaid = 0;
        const loansToRemove = [];

        GameState.loans.forEach((loan, index) => {
            if (GameState.cash >= loan.monthlyPayment) {
                GameState.cash -= loan.monthlyPayment;
                totalPaid += loan.monthlyPayment;

                // Parte de la cuota es interés, parte es capital
                const interestPayment = loan.remainingBalance * (loan.interestRate / 12);
                const principalPayment = loan.monthlyPayment - interestPayment;

                loan.remainingBalance -= principalPayment;
                loan.remainingMonths--;

                if (loan.remainingMonths <= 0 || loan.remainingBalance <= 1) {
                    loansToRemove.push(index);
                }
            } else {
                // Impago! (Por ahora solo se acumula deuda o game over? Simplifiquemos: se resta igual y vas a negativo)
                GameState.cash -= loan.monthlyPayment;
                // Penalización?
            }
        });

        // Eliminar préstamos pagados (en orden inverso para no romper índices)
        for (let i = loansToRemove.length - 1; i >= 0; i--) {
            GameState.loans.splice(loansToRemove[i], 1);
        }

        return totalPaid;
    }
};
