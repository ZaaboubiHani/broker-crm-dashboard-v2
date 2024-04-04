import { Api } from "../../../../core/api/api.source";
import ExpensesDayEntity from "../../../../core/entities/expenses-day.entity";
import ExpensesUserEntity from "../../../../core/entities/expenses-user.entity";
import ResponseEntity from "../../../../core/entities/response.entity";
import { formatDateToYYYYMMDD } from "../../../../core/functions/date-format";

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
    async getExpensesDayInterval(startDate: Date, endDate: Date, userId: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/dashboard/expensesdays`, {
                params: {
                    startDate: formatDateToYYYYMMDD(startDate),
                    endDate: formatDateToYYYYMMDD(endDate),
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
    async getExpenseUser(date: Date, userId: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/dashboard/expensesUsers`, {
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

                let expenseUser = ExpensesUserEntity.fromJson(response.data);
                return new ResponseEntity({ code: response.status, data: expenseUser });
            }
            return new ResponseEntity({ code: response.status, data: {} });
        } catch (error: any) {
            if (error?.response?.status) {
                return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: {} });
            }
            return new ResponseEntity({ code: -1, message: 'Failed to retrieve data' });
        }
    }
    async validateExpenseUser(expenseId: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().put(`/dashboard/expensesUsers/${expenseId}`, {
                validation: "Approved"
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {


                return new ResponseEntity({ code: response.status, data: true });
            }
            return new ResponseEntity({ code: response.status, data: false });
        } catch (error: any) {
            if (error?.response?.status) {
                return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: false });
            }
            return new ResponseEntity({ code: -1, message: 'Failed to retrieve data' });
        }
    }
}