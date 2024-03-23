
import { Api } from "../../../../core/api/api.source";
import ResponseEntity from "../../../../core/entities/response.entity";
import { UserRole } from "../../../../core/entities/user.entity";

export default class RevenueRemote {
    async getRevenues(date: Date, superId?: string, isHonored?: boolean, role?: UserRole): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/month/supervisor/classementchiffredaffaireequipe`, {
                params: {
                    year: date.getFullYear(),
                    month: (date.getMonth() + 1),
                    supervisorId: superId,
                    isHonored: isHonored,
                    role: role,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {

                return new ResponseEntity({ code: response.status, data: response.data ?? [] });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }


}