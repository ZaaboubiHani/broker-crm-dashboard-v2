

export default class UserTrackingEntity {
    _id?: string;
    createdAt?: Date;
    latitude?: string;
    longitude?: string;

    constructor(data?: Partial<UserTrackingEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): UserTrackingEntity {
        const createdAt = json.createdAt ? new Date(json.createdAt) : undefined;
        createdAt?.setHours(createdAt.getHours() + 1);
        return new UserTrackingEntity({ ...json, createdAt });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<UserTrackingEntity>): UserTrackingEntity {
        return new UserTrackingEntity({ ...this, ...data });
    }

}