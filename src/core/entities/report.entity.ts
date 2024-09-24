import ClientEntity from "./client.entity";
import CommentEntity from "./comment.entity";
import ProductEntity from "./product.entity";
import VisitEntity from "./visit.entity";


export default class ReportEntity {
    _id?: string;
    visit?: VisitEntity[];
    location?: string;
    note?: string;
    objectif?: string;
    products?: {
        product: ProductEntity,
        quantity: number,
        rotations: number,
    }[];
    coProducts?: {
        coProduct: ProductEntity,
        quantity: number,
        rotations: number,
    }[];
    suppliers?: ClientEntity[];
    comments?: CommentEntity[];
    createdAt?: Date;
    nearbyClients?: ClientEntity[];

    constructor(data?: Partial<ReportEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): ReportEntity {
        const createdAt = json.createdAt ? new Date(json.createdAt) : undefined;
        createdAt?.setHours(createdAt.getHours() + 1);
        
        
        return new ReportEntity({ ...json, createdAt });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<ReportEntity>): ReportEntity {
        return new ReportEntity({ ...this, ...data });
    }

}