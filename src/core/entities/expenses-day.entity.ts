import UserEntity from "./user.entity";

export default class ExpensesDayEntity {
    _id?: string;
    user?: UserEntity;
    totalVisitsDoctor?: number;
    totalVisitsPharmacy?: number;
    totalVisitsWholesaler?: number;
    kmTotal?: number;
    indemnityKm?: number;
    nightsTotal?: number;
    indemnityNights?: number;
    otherExpenses?: number;
    startWilaya?: string;
    endWilaya?: string;
    startCity?: string;
    endCity?: string;
    date?: Date;

    constructor(data?: Partial<ExpensesDayEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): ExpensesDayEntity {
        const date = json.date ? new Date(json.date) : undefined;
        return new ExpensesDayEntity({ ...json, date });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<ExpensesDayEntity>): ExpensesDayEntity {
        return new ExpensesDayEntity({ ...this, ...data });
    }

}