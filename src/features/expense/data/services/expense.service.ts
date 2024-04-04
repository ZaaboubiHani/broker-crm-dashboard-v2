import ExpenseDayModel from "../../domain/models/expense-day.model";
import ExpenseUserModel from "../../domain/models/expense-user.model";
import ExpenseRespository from "../../domain/repositories/expense.repository";
import ExpenseRemote from "../remotes/expense.remote";

export default class ExpenseService extends ExpenseRespository {
    private static _instance: ExpenseService | null = null;
    private _expenseRemote?: ExpenseRemote = new ExpenseRemote();

    private constructor() {
        super();
    }

    static getInstance(): ExpenseService {
        ExpenseService._instance = new ExpenseService();
        return ExpenseService._instance;
    }

    async getExpensesDay(date: Date, userId: string): Promise<ExpenseDayModel[]> {
        let response = await this._expenseRemote!.getExpensesDay(date, userId);
        return response.data;
    }
    async getExpensesDayInterval(startDate: Date, endDate: Date, userId: string): Promise<ExpenseDayModel[]> {
        let response = await this._expenseRemote!.getExpensesDayInterval(startDate, endDate, userId);
        return response.data;
    }
    async getExpenseUser(date: Date, userId: string): Promise<ExpenseUserModel> {
        let response = await this._expenseRemote!.getExpenseUser(date, userId);
        return response.data;
    }
    async validateExpenseUser(expenseId: string): Promise<ExpenseUserModel> {
        let response = await this._expenseRemote!.validateExpenseUser(expenseId);
        return response.data;
    }

}