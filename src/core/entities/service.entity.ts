import EstablishmentEntity from "./establishment.entity";


export default class ServiceEntity {
    _id?: string;
    name?: string;
    establishments?: EstablishmentEntity[];

    constructor(data?: Partial<ServiceEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): ServiceEntity {
       
        return new ServiceEntity({ ...json });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<ServiceEntity>): ServiceEntity {
        return new ServiceEntity({ ...this, ...data });
    }

}