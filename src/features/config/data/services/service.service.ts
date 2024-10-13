import ServiceModel from "../../domain/models/service.model";
import ServiceRepository from "../../domain/repositories/service.repository";
import ServiceRemote from "../remotes/service.remote";

export default class ServiceService extends ServiceRepository {
    private static _instance: ServiceService | null = null;
    private _serviceRemote?: ServiceRemote = new ServiceRemote();
    private constructor() {
        super();
    }
    static getInstance(): ServiceService {
        ServiceService._instance = new ServiceService();
        return ServiceService._instance;
    }
    async getServices(isDrafted: boolean): Promise<ServiceModel[]> {
        let response = await this._serviceRemote!.getServices(isDrafted);
        return response.data;
    }
    async createService(service: ServiceModel): Promise<void> {
        let response = await this._serviceRemote!.createService(service);
        return response.data;
    }
    async updateService(service: ServiceModel): Promise<void> {
        let response = await this._serviceRemote!.updateService(service);
        return response.data;
    }
    async draftService(service: ServiceModel): Promise<void> {
        service.isDrafted = true;
        let response = await this._serviceRemote!.updateService(service);
        return response.data;
    }
    async undraftService(service: ServiceModel): Promise<void> {
        service.isDrafted = false;
        let response = await this._serviceRemote!.updateService(service);
        return response.data;
    }
}