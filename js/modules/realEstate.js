import { GameState } from '../state.js';
import { Bank } from './bank.js';

export const RealEstate = {
    availableProperties: [],

    types: [
        { name: 'Plaza de Garaje', minPrice: 15000, maxPrice: 30000, yield: 0.05 },
        { name: 'Piso Pequeño', minPrice: 80000, maxPrice: 150000, yield: 0.045 },
        { name: 'Apartamento Turístico', minPrice: 120000, maxPrice: 200000, yield: 0.06 },
        { name: 'Local Comercial', minPrice: 200000, maxPrice: 400000, yield: 0.055 },
        { name: 'Chalet', minPrice: 400000, maxPrice: 800000, yield: 0.035 }
    ],

    generateListings() {
        this.availableProperties = [];
        for (let i = 0; i < 4; i++) {
            const typeVar = this.types[Math.floor(Math.random() * this.types.length)];
            const price = Math.floor(Math.random() * (typeVar.maxPrice - typeVar.minPrice) + typeVar.minPrice);
            // Rental yield varies slightly
            const actualYield = typeVar.yield + (Math.random() * 0.02 - 0.01);
            const monthlyRent = Math.floor((price * actualYield) / 12);

            this.availableProperties.push({
                id: Date.now() + i,
                name: typeVar.name,
                price: price,
                monthlyRent: monthlyRent,
                downPaymentPct: 0.20 // 20% entrada
            });
        }
    },

    buyProperty(propertyId, useMortgage = true) {
        const propertyIndex = this.availableProperties.findIndex(p => p.id === propertyId);
        if (propertyIndex === -1) return { success: false, message: 'Propiedad no encontrada' };

        const property = this.availableProperties[propertyIndex];
        const downPayment = useMortgage ? property.price * property.downPaymentPct : property.price;
        const loanAmount = property.price - downPayment;

        if (GameState.cash < downPayment) {
            return { success: false, message: 'Necesitas más dinero para la entrada' };
        }

        // Logic check: Mortgage limit handled by Bank logic or separate?
        // Let's assume bank approves automatically for simplicity if personal loans aren't maxed, 
        // OR we just add it as a "Mortgage" type loan which bypasses the personal cap but checks total debt.

        if (useMortgage && loanAmount > 0) {
            // We add a mortgage loan
            // Mortgages usually 20-30 years. Let's say 20 years (240 months)
            // Calc payment
            const r = Bank.INTEREST_RATES.mortgage / 12;
            const n = 240;
            const monthlyPayment = (loanAmount * r) / (1 - Math.pow(1 + r, -n));

            GameState.loans.push({
                id: Date.now(),
                type: 'Hipotecario',
                principal: loanAmount,
                termMonths: n,
                remainingMonths: n,
                monthlyPayment: monthlyPayment,
                interestRate: Bank.INTEREST_RATES.mortgage,
                remainingBalance: loanAmount
            });
        }

        GameState.cash -= downPayment;
        GameState.inventory.realEstate.push(property);

        // Remove from market and refresh one slot
        this.availableProperties.splice(propertyIndex, 1);

        return { success: true, message: `¡Has comprado: ${property.name}!` };
    }
};

// Initial Gen
RealEstate.generateListings();
