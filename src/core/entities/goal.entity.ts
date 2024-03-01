

export default class GoalEntity {
    _id?: string;
    url?: string;

    constructor(data?: Partial<GoalEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): GoalEntity {
       
        return new GoalEntity({ ...json });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<GoalEntity>): GoalEntity {
        return new GoalEntity({ ...this, ...data });
    }

}