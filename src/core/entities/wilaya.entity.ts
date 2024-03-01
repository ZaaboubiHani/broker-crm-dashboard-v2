export default class WilayaEntity {
    _id?: number;
    name?: string;
    communes?: string[];

    constructor(data?: Partial<WilayaEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): WilayaEntity {
        return new WilayaEntity(json);
    }

    toJson(): Record<string, any> {
        return { ...this };
    }

}