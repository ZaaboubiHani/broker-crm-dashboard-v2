export default class ExpensesConfigEntity {
    _id?: string;
    kmPrice?: number;
    nightPrice?: number;

    constructor(data?: Partial<ExpensesConfigEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): ExpensesConfigEntity {

        return new ExpensesConfigEntity({ ...json });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<ExpensesConfigEntity>): ExpensesConfigEntity {
        return new ExpensesConfigEntity({ ...this, ...data });
    }

}