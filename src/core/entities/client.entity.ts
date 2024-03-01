import EstablishmentEntity from "./establishment.entity";
import ServiceEntity from "./service.entity";
import SpecialityEntity from "./speciality.entity";
import WilayaEntity from "./wilaya.entity";

export enum ClientType {
    doctor = 'Doctor',
    pharmacy = 'Pharmacy',
    wholesaler = 'Wholesaler',
}

export enum SectorType {
    private = 'Private',
    state = 'State',
}
export enum PotentialType {
    a = 'A',
    b = 'B',
    c = 'C',
}


export default class ClientEntity {
    _id?: string;
    fullName?: string
    location?: string;
    service?: ServiceEntity;
    establishment?: EstablishmentEntity;
    type?: ClientType;
    sector?: SectorType;
    grade?: string;
    wilaya?: WilayaEntity;
    commune?: string;
    speciality?: SpecialityEntity;
    totalSellers?: number;
    totalPostChifa?: number;
    totalOperators?: number;
    visitsNumber?: number;
    clientPresence?: string;
    potential?: PotentialType;
    email?: string;
    phoneNumberOne?: string;
    phoneNumberTwo?: string;
    presence?: string;

    constructor(data?: Partial<ClientEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): ClientEntity {
       
        return new ClientEntity({ ...json,});
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<ClientEntity>): ClientEntity {
        return new ClientEntity({ ...this, ...data });
    }

}