
import VisitModel from "../../domain/models/visit.model";
import VisitRepository from "../../domain/repositories/visit.repository";
import PlanVisitRemote from "../remotes/visit.remote";


export default class VisitService extends VisitRepository {
    private static _instance: VisitService | null = null;
    private _planVisitRemote: PlanVisitRemote = new PlanVisitRemote();

    private constructor() {
        super();
    }

    static getInstance(): VisitService {
        VisitService._instance = new VisitService();
        return VisitService._instance;
    }

    async getPlans(date: Date, userId: string): Promise<{ day: Date }[]> {
        let response = await this._planVisitRemote.getPlans(date, userId);
        return response.data;
    }
    async getVisits(date: Date, userId: string): Promise<VisitModel[]> {
        let response = await this._planVisitRemote.getVisits(date, userId);
        return response.data;
    }
}