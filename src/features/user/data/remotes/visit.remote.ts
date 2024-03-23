

import { Api } from "../../../../core/api/api.source";
import ResponseEntity from "../../../../core/entities/response.entity";
import VisitEntity from "../../../../core/entities/visit.entity";

export default class VisitRemote {
    async getVisits(date: Date, page: number, size: number, userId?: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().post(`/dashboard/reports`, {
                year: date.getFullYear().toString(),
                month: (date.getMonth() + 1).toString(),
                limit: size,
                page: page,
                user: userId,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let visits: VisitEntity[] = [];
                visits = response.data.docs.map((data: any) => VisitEntity.fromJson(data));
                return new ResponseEntity({ code: response.status, data: { visits: visits, total: response.data.totalDocs } });
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