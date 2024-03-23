
import { UserRole } from "../../../../core/entities/user.entity";
import RevenueStatisticsRespository from "../../domain/repositories/revenue-statistics.repository";
import RevenueStatisticsRemote from "../remotes/revenue-statistics.remote";

export default class RevenueStatisticsService extends RevenueStatisticsRespository {
    private static _instance: RevenueStatisticsService | null = null;
    private _revenueStatisticsRemote?: RevenueStatisticsRemote = new RevenueStatisticsRemote();

    private constructor() {
        super();
    }

    static getInstance(): RevenueStatisticsService {
        RevenueStatisticsService._instance = new RevenueStatisticsService();
        RevenueStatisticsService._instance._revenueStatisticsRemote = new RevenueStatisticsRemote();
        return RevenueStatisticsService._instance;
    }

    async getTeamRevenue(date: Date, superId?: string, role?: UserRole): Promise<{ honored: number, nonHonored: number, total: number }> {
        let response = await this._revenueStatisticsRemote!.getTeamRevenue(date, superId, role);
        return response.data;
    }
    async getUserRevenue(date: Date, userId?: string,): Promise<{ honored: number, nonHonored: number, total: number }> {
        let response = await this._revenueStatisticsRemote!.getUserRevenue(date, userId,);
        return response.data;
    }
    async getProdutRevenue(date: Date, userId?: string,isHonored?: boolean,): Promise<{ name: string, quantity: number, total: number, percentage: number, }[]> {
        let response = await this._revenueStatisticsRemote!.getProdutRevenue(date, userId,isHonored);
        return response.data;
    }
    async getWilayaRevenue(date: Date, userId?: string,isHonored?: boolean,): Promise<{ name: string, quantity: number, totalSales: number, percentage: number, products: { name: string, quantity: number, total: number, percentage: number }[] }[]> {
        let response = await this._revenueStatisticsRemote!.getWilayaRevenue(date, userId,isHonored);
        return response.data;
    }

}