
export enum SpecialityType {
    doctor = 'Doctor',
    wholesaler = 'Wholesaler',
    pharmacy = 'Pharmacy',
}


export default class SpecialityEntity {
    _id?: string;
    name?: string;
    isDrafted?: boolean;
    type?: SpecialityType;

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