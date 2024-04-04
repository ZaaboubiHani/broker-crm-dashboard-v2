

import StatisticsRespository from "../../domain/repositories/statistics.repository";
import StatisticsRemote from "../remotes/statistics.remote";

export default class StatisticsService extends StatisticsRespository {
    private static _instance: StatisticsService | null = null;
    private _statisticsRemote?: StatisticsRemote = new StatisticsRemote();

    private constructor() {
        super();
    }

    static getInstance(): StatisticsService {
        StatisticsService._instance = new StatisticsService();
        return StatisticsService._instance;
    }

    async getUserStats(userId: string, date: Date): Promise<{ month: number, honoredCommands: number, doneVisits: number, allVisits: number, totalSales: number, goalSales: number, goalVisits: number }[]> {
        let response = await this._statisticsRemote!.getUserStats(userId, date);
        return response.data;
    }
    async getTeamStats(superId: string, date: Date): Promise<{ month: number, honoredCommands: number, doneVisits: number, allVisits: number, totalSales: number, goalSales: number, goalVisits: number }[]> {
        let response = await this._statisticsRemote!.getTeamStats(superId, date);
        return response.data;
    }
    async getCompanyStats(date: Date): Promise<{ month: number, honoredCommands: number, doneVisits: number, allVisits: number, totalSales: number }[]> {
        let response = await this._statisticsRemote!.getCompanyStats(date);
        return response.data;
    }
    async getContributionUser(userId: string, date: Date): Promise<{ teamSales: number, userSales: number }> {
        let response = await this._statisticsRemote!.getContributionUser(userId, date);
        return response.data;
    }
    async getContributionCompany(date: Date): Promise<{ fullName:  string, rank: number, supervisorId: string, totalRemised: number }[]> {
        let response = await this._statisticsRemote!.getContributionCompany(date);
        return response.data;
    }
    async getContributionsUsers(superId: string, date: Date): Promise<{ userId: string, fullName: string, total: number, rank: number, percentage: number }[]> {
        let response = await this._statisticsRemote!.getContributionsUsers(superId, date);
        return response.data;
    }
    async getContributionTeam(superId: string, date: Date): Promise<{ teamSales: number, allSales: number }> {
        let response = await this._statisticsRemote!.getContributionTeam(superId, date);
        return response.data;
    }
}