import CompanyModel from "../models/company.model";



export default abstract class CompanyRepository {
    abstract getSingleCompany(): Promise<CompanyModel>;
}