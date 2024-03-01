

import { Api } from "../../../../core/api/api.source";
import ResponseEntity from "../../../../core/entities/response.entity";
import VisitEntity from "../../../../core/entities/visit.entity";

export default class VisitRemote {
    async getVisits(): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().post(`/dashboard/visits`,{
                    date: "2024-02-19",
                    limit: 100,
                    page: 1,
                    // sortBy: "",
                    // sortDirection: "asc",
                    supervisorId:"",
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let visits: VisitEntity[] = [];
                visits = response.data.map((data: any) => VisitEntity.fromJson(data));
                return new ResponseEntity({ code: response.status, data: visits });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
}