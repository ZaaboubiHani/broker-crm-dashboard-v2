import { UserRole } from "../../../../core/entities/user.entity";
import RevenueRepository from "../../domain/repositories/revenue.repository";
import RevenueRemote from "../remotes/revenue.remote";


export default class RevenueService extends RevenueRepository {
    private static _instance: RevenueService | null = null;
    private _revenueRemote?: RevenueRemote = new RevenueRemote();

    private constructor() {
        super();
    }

    static getInstance(): RevenueService {
        RevenueService._instance = new RevenueService();
        return RevenueService._instance;
    }

    async getRevenues(date: Date, superId?: string, isHonored?: boolean,role?:UserRole): Promise<{
        rank?: number,
        userId?: string,
        fullName?: string,
        total?: number,
        percentage?: number,
    }[]> {
        let response = await this._revenueRemote!.getRevenues(date, superId, isHonored,role);
        return response.data;
    }

}