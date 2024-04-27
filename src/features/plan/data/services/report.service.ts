import ReportModel from "../../domain/models/report.model";
import ReportRepository from "../../domain/repositories/report.repository";
import ReportRemote from "../remotes/report.remote";

export default class ReportService extends ReportRepository {
    private static _instance: ReportService | null = null;
    private _reportRemote?: ReportRemote = new ReportRemote();

    private constructor() {
        super();
    }

    static getInstance(): ReportService {
            ReportService._instance = new ReportService();
        return ReportService._instance;
    }

    async getReport(id: string): Promise<ReportModel> {
        let response = await this._reportRemote!.getReport(id);
        return response.data;
    }
}