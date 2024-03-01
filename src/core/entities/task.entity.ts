

export default class SpecialityEntity {
    _id?: string;
    

    constructor(data?: Partial<SpecialityEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): SpecialityEntity {

        return new SpecialityEntity({ ...json });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<SpecialityEntity>): SpecialityEntity {
        return new SpecialityEntity({ ...this, ...data });
    }

}