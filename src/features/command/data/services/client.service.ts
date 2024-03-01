import ClientRespository from "../../domain/repositories/command.repository";
import ClientRemote from "../remotes/command.remote";

export default class ClientService extends ClientRespository {
    private static _instance: ClientService | null = null;
    private _clientRemote?: ClientRemote = new ClientRemote();

    private constructor() {
        super();
    }

    static getInstance(): ClientService {
        if (!ClientService._instance) {
            ClientService._instance = new ClientService();
           
        }
        return ClientService._instance;
    }
}