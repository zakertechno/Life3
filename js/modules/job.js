import { GameState } from '../state.js';

export const JobSystem = {
    careers: {
        'comercio': [
            { title: 'Reponedor', salary: 1100, reqMonths: 0 },
            { title: 'Cajero', salary: 1300, reqMonths: 6 },
            { title: 'Encargado de Tienda', salary: 1800, reqMonths: 24 },
            { title: 'Gerente Regional', salary: 3500, reqMonths: 60 }
        ],
        'tech': [
            { title: 'Becario IT', salary: 800, reqMonths: 0 },
            { title: 'Junior Dev', salary: 1800, reqMonths: 6 },
            { title: 'Senior Dev', salary: 3200, reqMonths: 36 },
            { title: 'CTO', salary: 6000, reqMonths: 96 }
        ]
    },

    currentCareerPath: 'comercio',
    monthsInCurrentJob: 0,

    nextTurn() {
        this.monthsInCurrentJob++;
    },

    getAvailablePromotions() {
        const path = this.careers[this.currentCareerPath];
        const currentJobIndex = path.findIndex(j => j.salary === GameState.salary); // Simple lookup based on salary

        // If exact match not found or max level
        if (currentJobIndex === -1 || currentJobIndex >= path.length - 1) return null;

        const nextJob = path[currentJobIndex + 1];
        if (this.monthsInCurrentJob >= nextJob.reqMonths) {
            return nextJob;
        }
        return null;
    },

    promote() {
        const nextJob = this.getAvailablePromotions();
        if (nextJob) {
            GameState.salary = nextJob.salary;
            GameState.jobTitle = nextJob.title;
            // No reset months? Or yes? Let's keep cumulative months for simplicity unless we track per-rank
            // Actually requirement is usually cumulative experience
            return { success: true, message: `¡Ascendido a ${nextJob.title}! Nuevo salario: ${nextJob.salary}€` };
        }
        return { success: false, message: 'No cumples los requisitos aún' };
    }
};
