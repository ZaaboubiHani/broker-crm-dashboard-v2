
import { UserRole } from "../../../../core/entities/user.entity";
import GoalModel from "../../domain/models/goal.model";
import GoalRepository from "../../domain/repositories/goal.repository";
import GoalRemote from "../remotes/goal.remote";


export default class GoalService extends GoalRepository {
    private static _instance: GoalService | null = null;
    private _goalRemote?: GoalRemote = new GoalRemote();

    private constructor() {
        super();
    }

    static getInstance(): GoalService {
        GoalService._instance = new GoalService();
        return GoalService._instance;
    }

    async getGoals(date: Date, role: UserRole): Promise<GoalModel[]> {
        let response = await this._goalRemote!.getGoals(date, role);
        return response.data;
    }
    async updateGoals(goals:GoalModel[]): Promise<GoalModel[]> {
        let response = await this._goalRemote!.updateGoals(goals);
        return response.data;
    }
}
