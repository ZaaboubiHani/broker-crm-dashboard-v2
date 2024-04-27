import VisitModel from "../../domain/models/visit.model";
import VisitRepository from "../../domain/repositories/visit.repository";
import VisitRemote from "../remotes/visit.remote";

export default class VisitService extends VisitRepository {
    private static _instance: VisitService | null = null;
    private _visitRemote?: VisitRemote = new VisitRemote();

    private constructor() {
        super();
    }

    static getInstance(): VisitService {
            VisitService._instance = new VisitService();
        return VisitService._instance;
    }

    async getVisits(): Promise<VisitModel[]> {
        let response = await this._visitRemote!.getVisits();
        return response.data;
    }
}