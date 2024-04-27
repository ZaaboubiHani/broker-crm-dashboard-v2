import { Api } from "../../../../core/api/api.source";
import GoalEntity from "../../../../core/entities/goal.entity";
import ResponseEntity from "../../../../core/entities/response.entity";
import { UserRole } from "../../../../core/entities/user.entity";

export default class GoalRemote {
    async getGoals(date: Date, role?: UserRole): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/dashboard/goals`,
                {
                    params: {
                        year: date.getFullYear().toString(),
                        month: (date.getMonth() + 1).toString(),
                        role: role,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            if (response.status == 200) {
                let goals = response.data.map((json: any) => GoalEntity.fromJson(json))
                return new ResponseEntity({ code: response.status, data: goals });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
    async updateGoals(goals: GoalEntity[]): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        let body = goals.map((goal) => {
            return {
                _id: goal._id,
                totalSales: goal.totalSales,
                totalVisits: goal.totalVisits,
            };
        });
        try {
            var response = await Api.instance.getAxios().put(`/dashboard/goals`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            if (response.status == 200) {
                return new ResponseEntity({ code: response.status, data: true });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
}
