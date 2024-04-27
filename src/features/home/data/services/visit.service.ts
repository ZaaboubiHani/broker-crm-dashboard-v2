import { UserRole } from "../../../../core/entities/user.entity";
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

    async getVisits(date: Date, page: number, size: number, sort: boolean, field?: string, superId?: string, userRole?: UserRole,): Promise<{ visits: VisitModel[], total: number }> {
        let response = await this._visitRemote!.getVisits(date, page, size, sort, field, superId, userRole);
        return response.data;
    }
}