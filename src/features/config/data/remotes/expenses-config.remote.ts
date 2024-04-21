
import ResponseEntity from "../../../../core/entities/response.entity";
import { Api } from "../../../../core/api/api.source";
import ExpensesConfigEntity from "../../../../core/entities/expenses-config.entity";

export default class ExpensesConfigRemote {
    async getExpensesConfig(): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/dashboard/expensesconfigs`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let expensesConfig = ExpensesConfigEntity.fromJson(response.data);
                return new ResponseEntity({ code: response.status, data: expensesConfig });
            }
            return new ResponseEntity({ code: response.status, data: {} });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: {} });
        }
    }

    async updateExpensesConfig(expensesConfig: ExpensesConfigEntity): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().put(`/dashboard/expensesconfigs/${expensesConfig._id}`, {
                kmPrice: expensesConfig.kmPrice,
                nightPrice: expensesConfig.nightPrice,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let updatedExpensesConfig = ExpensesConfigEntity.fromJson(response.data);
                return new ResponseEntity({ code: response.status, data: updatedExpensesConfig });
            }
            return new ResponseEntity({ code: response.status, data: {} });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: {} });
        }
    }

}