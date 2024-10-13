
import ClientModel from "../../domain/models/client.model";
import ClientRepository from "../../domain/repositories/client.repository";
import ClientRemote from "../remotes/client.remote";


export default class ClientService extends ClientRepository {
    private static _instance: ClientService | null = null;
    private _clientRemote?: ClientRemote = new ClientRemote();

    private constructor() {
        super();
    }

    static getInstance(): ClientService {
            ClientService._instance = new ClientService();
        return ClientService._instance;
    }

    async getAllClients(): Promise<ClientModel[]> {
        let response = await this._clientRemote!.getClients(false);
        return response.data;
    }
    async getAllDraftedClients(): Promise<ClientModel[]> {
        let response = await this._clientRemote!.getClients(true);
        return response.data;
    }

    async updateClient(client:ClientModel): Promise<ClientModel> {
        let response = await this._clientRemote!.updateClient(client);
        return response.data;
    }
   
    async createClient(client:ClientModel): Promise<ClientModel> {
        let response = await this._clientRemote!.createClient(client);
        return response.data;
    }
}
