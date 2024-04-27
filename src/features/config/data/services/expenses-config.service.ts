import ExpensesConfigModel from "../../domain/models/expenses-config.model";
import ExpensesConfigRepository from "../../domain/repositories/expenses-config.repository";
import ExpensesConfigRemote from "../remotes/expenses-config.remote";


export default class ExpensesConfigService extends ExpensesConfigRepository {
    private static _instance: ExpensesConfigService | null = null;
    private _expensesConfigRemote?: ExpensesConfigRemote = new ExpensesConfigRemote();

    private constructor() {
        super();
    }

    static getInstance(): ExpensesConfigService {
            ExpensesConfigService._instance = new ExpensesConfigService();
        return ExpensesConfigService._instance;
    }
    
    async getSingleExpensesConfig(): Promise<ExpensesConfigModel> {
        let response = await this._expensesConfigRemote!.getExpensesConfig();
        return response.data;
    }
    async updateExpensesConfig(expensesConfig:ExpensesConfigModel): Promise<ExpensesConfigModel> {
        let response = await this._expensesConfigRemote!.updateExpensesConfig(expensesConfig);
        return response.data;
    }
}