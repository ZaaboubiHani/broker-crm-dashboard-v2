import { ClientType } from "../../../../core/entities/client.entity";
import ClientModel from "../../domain/models/client.model";
import ClientRespository from "../../domain/repositories/client.repository";
import ClientRemote from "../remotes/client.remote";

export default class ClientService extends ClientRespository {
    private static _instance: ClientService | null = null;
    private _clientRemote?: ClientRemote = new ClientRemote();

    private constructor() {
        super();
    }

    static getInstance(): ClientService {
        ClientService._instance = new ClientService();
        return ClientService._instance;
    }

    async getClients(type: ClientType, fullName: string, page: number, size: number, order: boolean, field?: string, superId?: string, userId?: string,): Promise<{ clients: ClientModel[], total: number }> {
        let response = await this._clientRemote!.getClients(type, fullName, page, size, order, field, superId, userId);
        return response.data;
    }
}