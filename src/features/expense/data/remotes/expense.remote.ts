import { Api } from "../../../../core/api/api.source";
import ExpensesDayEntity from "../../../../core/entities/expenses-day.entity";
import ResponseEntity from "../../../../core/entities/response.entity";

export default class ExpenseRemote {
    async getExpensesDay(date: Date, userId: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/dashboard/expensesdays`, {
                params: {
                    year: date.getFullYear().toString(),
                    month: (date.getMonth() + 1).toString(),
                    user: userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let expenses: ExpensesDayEntity[] = [];
                expenses = response.data.map((data: any) => ExpensesDayEntity.fromJson(data));
                return new ResponseEntity({ code: response.status, data: expenses });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            if (error?.response?.status) {
                return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
            }
            return new ResponseEntity({ code: -1, message: 'Failed to retrieve data' });
        }
    }
}