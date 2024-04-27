export enum ProductType {
    regular = 'Regular',
    concurrent = 'Concurrent',
}


export default class ProductEntity {
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
    type?: ProductType;

    constructor(data?: Partial<ProductEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): ProductEntity {
        const DDP = json.DDP ? new Date(json.DDP) : undefined;
        return new ProductEntity({ ...json, DDP });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<ProductEntity>): ProductEntity {
        return new ProductEntity({ ...this, ...data });
    }

}