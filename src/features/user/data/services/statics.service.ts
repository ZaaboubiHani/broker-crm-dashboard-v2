
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

    async getPlandetournee(date: Date, userId: string): Promise<number> {
        let response = await this._statisticsRemote!.getPlandetournee(date,userId);
        return response.data;
    }

    async getMoyenneVisitesParJour(date: Date, userId: string): Promise<number> {
        let response = await this._statisticsRemote!.getMoyenneVisitesParJour(date,userId);
        return response.data;
    }

    async getTauxdereussite(date: Date, userId: string): Promise<number> {
        let response = await this._statisticsRemote!.getTauxdereussite(date,userId);
        return response.data;
    }

    async getCouverturePortefeuilleClient(date: Date, userId: string): Promise<number> {
        let response = await this._statisticsRemote!.getCouverturePortefeuilleClient(date,userId);
        return response.data;
    }
    async getObjectifChiffreDaffaire(date: Date, userId: string): Promise<number> {
        let response = await this._statisticsRemote!.getObjectifChiffreDaffaire(date,userId);
        return response.data;
    }
    async getObjectifvisites(date: Date, userId: string): Promise<number> {
        let response = await this._statisticsRemote!.getObjectifvisites(date,userId);
        return response.data;
    }
}