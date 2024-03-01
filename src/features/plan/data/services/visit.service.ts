
import VisitRespository from "../../domain/repositories/visit.repository";
import VisitRemote from "../remotes/visit.remote";


export default class VisitService extends VisitRespository {
    private static _instance: VisitService | null = null;
    private _visitRemote: VisitRemote = new VisitRemote();

    private constructor() {
        super();
    }

    static getInstance(): VisitService {
        if (!VisitService._instance) {
            VisitService._instance = new VisitService();

        }
        return VisitService._instance;
    }

    async getPlans(date: Date, userId?: string): Promise<{ day: Date }[]> {
        let response = await this._visitRemote.getPlans(date, userId);
        return response.data;
    }
}