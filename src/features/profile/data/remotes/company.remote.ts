
import ResponseEntity from "../../../../core/entities/response.entity";
import CompanyEntity from "../../../../core/entities/company.entity";
import { Api } from "../../../../core/api/api.source";

export default class CompanyRemote {
    async getCompanies(): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/companies`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response);
            if (response.status == 200) {
                let companies: CompanyEntity[] = [];
                companies = [CompanyEntity.fromJson(response.data)];
                return new ResponseEntity({ code: response.status, data: companies });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }

}