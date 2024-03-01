import VisitModel from "../../domain/models/visit.model";
import VisitRespository from "../../domain/repositories/visit.repository";
import VisitRemote from "../remotes/visit.remote";

export default class VisitService extends VisitRespository {
    private static _instance: VisitService | null = null;
    private _visitRemote?: VisitRemote = new VisitRemote();

    private constructor() {
        super();
    }

    static getInstance(): VisitService {
        if (!VisitService._instance) {
            VisitService._instance = new VisitService();
           
        }
        return VisitService._instance;
    }

    async getVisits(date: Date, page: number, size: number, userId?: string): Promise<{ visits: VisitModel[], total: number }> {
        let response = await this._visitRemote!.getVisits(date,page,size,userId);
        return response.data;
    }
}