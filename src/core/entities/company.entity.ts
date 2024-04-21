export enum CompanyType {
    wholesaler = 'Wholesaler',
    laboratory = 'Laboratory',
}

export default class CompanyEntity {
    _id?: string;
    name?: string;
    logo?: { _id: string, url: string };
    address?: string;
    phoneNumber1?: string;
    phoneNumber2?: string;
    email?: string;
    color?: string;
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