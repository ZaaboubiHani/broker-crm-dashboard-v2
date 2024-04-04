import FileEntity from "./file.entity";

export default class ExpensesDayEntity {
    _id?: string;
    totalVisitsDoctor?: number;
    totalVisitsPharmacy?: number;
    totalVisitsWholesaler?: number;
    kmTotal?: number;
    indemnityKm?: number;
    nightsTotal?: number;
    indemnityNights?: number;
    otherExpenses?: number;
    totalExpense?: number;
    startWilaya?: string;
    endWilaya?: string;
    startCommune?: string;
    endCommune?: string;
    expenseDate?: Date;
    proofs?: FileEntity[];

    constructor(data?: Partial<ExpensesDayEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): ExpensesDayEntity {
        const expenseDate = json.expenseDate ? new Date(json.expenseDate) : undefined;
        return new ExpensesDayEntity({ ...json, expenseDate });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<ExpensesDayEntity>): ExpensesDayEntity {
        return new ExpensesDayEntity({ ...this, ...data });
    }

}