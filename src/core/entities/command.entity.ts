import ClientEntity from "./client.entity";
import FileEntity from "./file.entity";
import MotivationEntity from "./motivation.entity";
import ProductEntity from "./product.entity";
import VisitEntity from "./visit.entity";

export enum CommandType {
    clearance = 'Destockage',
    direct = 'Direct',
}
export enum CommandStatus {
    nonHonored = 'Non honoré',
    honored = 'Honoré',
    onHold = 'En attente',
    canceled = 'Annulé',
}

export default class CommandEntity {
    _id?: string;
    visit?: VisitEntity;
    status?: CommandStatus;
    type?: CommandType;
    note?: string;
    total?: number;
    remise?: number;
    totalRemised?: number;
    products?: {
        product: ProductEntity,
        wholesalerPriceUnit: number,
        pharmacyPriceUnit: number,
        superWholesalerPriceUnit: number,
        quantity: number,
        total: number,
    }[];
    motivations?: MotivationEntity[];
    suppliers?: ClientEntity[];
    finalSupplier?: ClientEntity;
    invoice?: FileEntity;
    signature?: FileEntity;
    createdAt?: Date;

    constructor(data?: Partial<CommandEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): CommandEntity {
        const createdAt = json.createdAt ? new Date(json.createdAt) : undefined;
        createdAt?.setHours(createdAt.getHours() + 1);
        return new CommandEntity({ ...json, createdAt });
    }

    toJson(): Record<string, any> {
        return { ...this };
    }

    copyWith(data: Partial<CommandEntity>): CommandEntity {
        return new CommandEntity({ ...this, ...data });
    }

}