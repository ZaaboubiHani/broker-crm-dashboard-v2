import ServiceEntity from "./service.entity";


export default class EstablishmentEntity {
    _id?: string;
    name?: string;
    wilaya?: string;
    commune?: string;
    isDrafted?: boolean;
    services?: ServiceEntity[];

    constructor(data?: Partial<EstablishmentEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): EstablishmentEntity {

        return new EstablishmentEntity({ ...json });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<EstablishmentEntity>): EstablishmentEntity {
        return new EstablishmentEntity({ ...this, ...data });
    }

}