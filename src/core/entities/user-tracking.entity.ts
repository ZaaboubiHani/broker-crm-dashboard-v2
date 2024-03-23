

export default class UserTrackingEntity {
    _id?: string;
    createdAt?: Date;
    time?: Date;
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
        const time = json.time ? new Date(json.time) : undefined;
        time?.setHours(time.getHours() + 1);
        let latitude = json.location.split(',')[0].trim();
        let longitude = json.location.split(',')[1].trim();
        return new UserTrackingEntity({ ...json, createdAt,time,latitude,longitude });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<UserTrackingEntity>): UserTrackingEntity {
        return new UserTrackingEntity({ ...this, ...data });
    }

}