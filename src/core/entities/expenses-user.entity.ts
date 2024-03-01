import ExpensesConfigEntity from "./expenses-config.entity";
import UserEntity from "./user.entity";

export enum ValidationType {
    hold = 'Hold',
    sent = 'Sent',
    approved = 'Approved',
}

export default class ExpensesUserEntity {
    _id?: string;
    user?: UserEntity;
    expensesConfig?: ExpensesConfigEntity;
    validation?: ValidationType;
    total?: number;

    constructor(data?: Partial<ExpensesUserEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): ExpensesUserEntity {
        return new ExpensesUserEntity({ ...json, });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<ExpensesUserEntity>): ExpensesUserEntity {
        return new ExpensesUserEntity({ ...this, ...data });
    }

}