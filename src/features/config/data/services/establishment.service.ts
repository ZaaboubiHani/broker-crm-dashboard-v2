import EstablishmentModel from "../../domain/models/establishment.model";
import EstablishmentRepository from "../../domain/repositories/establishment.repository";
import EstablishmentRemote from "../remotes/establishment.remote";
export default class EstablishmentService extends EstablishmentRepository {
    private static _instance: EstablishmentService | null = null;
    private _establishmentRemote?: EstablishmentRemote = new EstablishmentRemote();
    private constructor() {
        super();
    }
    static getInstance(): EstablishmentService {
        EstablishmentService._instance = new EstablishmentService();
        return EstablishmentService._instance;
    }
    async getEstablishments(isDrafted: boolean): Promise<EstablishmentModel[]> {
        let response = await this._establishmentRemote!.getEstablishments(isDrafted);
        return response.data;
    }
    async createEstablishment(establishment: EstablishmentModel): Promise<void> {
        let response = await this._establishmentRemote!.createEstablishment(establishment);
        return response.data;
    }
    async updateEstablishment(establishment: EstablishmentModel): Promise<void> {
        let response = await this._establishmentRemote!.updateEstablishment(establishment);
        return response.data;
    }
    async draftEstablishment(establishment: EstablishmentModel): Promise<void> {
        establishment.isDrafted = true;
        let response = await this._establishmentRemote!.updateEstablishment(establishment);
        return response.data;
    }
    async undraftEstablishment(establishment: EstablishmentModel): Promise<void> {
        establishment.isDrafted = false;
        let response = await this._establishmentRemote!.updateEstablishment(establishment);
        return response.data;
    }
}