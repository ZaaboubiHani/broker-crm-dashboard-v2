import VisitModel from "../../domain/models/visit.model";
import VisitRespository from "../../domain/repositories/visit.repository";
import ClientVisitRemote from "../remotes/visit.remote";

export default class VisitService extends VisitRespository {
    private static _instance: VisitService | null = null;
    private _clientVisitRemote?: ClientVisitRemote = new ClientVisitRemote();

    private constructor() {
        super();
    }

    static getInstance(): VisitService {
        VisitService._instance = new VisitService();
        return VisitService._instance;
    }

    async getVisits(clientId: string, page: number, size: number, userId?: string): Promise<{ visits: VisitModel[], total: number }> {
        let response = await this._clientVisitRemote!.getVisits(clientId, page, size, userId);
        return response.data;
    }
}