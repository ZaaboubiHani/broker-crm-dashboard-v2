
import CompanyModel from "../../domain/models/company.model";
import CompanyRespository from "../../domain/repositories/company.repository";
import CompanyRemote from "../remotes/company.remote";


export default class CompanyService extends CompanyRespository {
    private static _instance: CompanyService | null = null;
    private _companyRemote?: CompanyRemote = new CompanyRemote();

    private constructor() {
        super();
    }

    static getInstance(): CompanyService {
        if (!CompanyService._instance) {
            CompanyService._instance = new CompanyService();
           
        }
        return CompanyService._instance;
    }
    
    async getSingleCompany(): Promise<CompanyModel> {
        let response = await this._companyRemote!.getCompanies();
        return response.data[0];
    }
}