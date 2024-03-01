export enum CompanyType {
    wholesaler = 'Wholesaler',
    laboratory = 'Laboratory',
}

export default class CompanyEntity {
    _id?: number;
    name?: string;
    type?: CompanyType;

    constructor(data?: Partial<CompanyEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): CompanyEntity {
        return new CompanyEntity(json);
    }

    toJson(): Record<string, any> {
        
        return { ...this };
    }

}