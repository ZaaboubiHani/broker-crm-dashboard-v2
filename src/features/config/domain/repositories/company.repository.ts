import CompanyModel from "../models/company.model";



export default abstract class CompanyRespository {
    abstract getSingleCompany(): Promise<CompanyModel>;
}