

import { Api } from "../../../../core/api/api.source";
import ResponseEntity from "../../../../core/entities/response.entity";
import { formatDateToYYYYMMDD } from "../../../../core/functions/date-format";
import PlanModel from "../../domain/models/plan.model";
import VisitModel from "../../domain/models/visit.model";

export default class PlanVisitRemote {

    public async getPlans(date: Date, userId: string): Promise<ResponseEntity> {
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
            if (error?.response?.status) {
                return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: { visits: [], total: 0 } });
            }
            return new ResponseEntity({ code: -1, message: 'Failed to retrieve data' });
        }
    }

    async getVisits(date: Date, userId: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/dashboard/plans/day`, {
                params: {
                    day: formatDateToYYYYMMDD(date),
                    user: userId,
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let visits: VisitModel[] = [];
                visits = response.data.map((data: any) => VisitModel.fromJson(data));
                return new ResponseEntity({ code: response.status, data: visits });
            }
            return new ResponseEntity({ code: response.status, data: { visits: [], total: 0 } });
        } catch (error: any) {
            if (error?.response?.status) {
                return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: { visits: [], total: 0 } });
            }
            return new ResponseEntity({ code: -1, message: 'Failed to retrieve data' });
        }
    }
}