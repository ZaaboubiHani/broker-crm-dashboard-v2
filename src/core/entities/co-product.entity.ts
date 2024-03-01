
export default class CoProductEntity {
    _id?: string;
    name?: string;
    ug?: number;
    remise?: number;
    PPA?: number;
    wholesalerPriceUnit?: number;
    pharmacyPriceUnit?: number;
    superWholesalerPriceUnit?: number;
    collision?: number;
    DDP?: Date;
    isDrafted?: boolean;

    constructor(data?: Partial<CoProductEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): CoProductEntity {
        const DDP = json.DDP ? new Date(json.DDP) : undefined;
        return new CoProductEntity({ ...json, DDP });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<CoProductEntity>): CoProductEntity {
        return new CoProductEntity({ ...this, ...data });
    }

}