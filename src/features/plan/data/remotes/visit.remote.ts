

import { Api } from "../../../../core/api/api.source";
import ResponseEntity from "../../../../core/entities/response.entity";
import PlanModel from "../../domain/models/plan.model";

export default class VisitRemote {
   
    
    async getPlans(date: Date, userId?: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().post(`/dashboard/plans`, {
                year: date.getFullYear().toString(),
                month: (date.getMonth() + 1).toString(),
                user: userId,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let plans: PlanModel[] = [];
                plans = response.data.map((data: any) => PlanModel.fromJson(data));
                return new ResponseEntity({ code: response.status, data: plans });
            }
            return new ResponseEntity({ code: response.status, data: { visits: [], total: 0 } });
        } catch (error: any) {
            if(error?.response?.status){
                return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: { visits: [], total: 0 } });
            }
            return new ResponseEntity({ code: -1, message: 'Failed to retrieve data' });
        }
    }
}