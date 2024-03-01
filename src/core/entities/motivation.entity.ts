

export default class MotivationEntity {
    _id?: string;
    motivation?: string;
    isDrafted?: boolean;

    constructor(data?: Partial<MotivationEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): MotivationEntity {

        return new MotivationEntity({ ...json });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<MotivationEntity>): MotivationEntity {
        return new MotivationEntity({ ...this, ...data });
    }

}