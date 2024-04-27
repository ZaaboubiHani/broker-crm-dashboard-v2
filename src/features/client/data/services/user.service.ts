import { UserRole } from "../../../../core/entities/user.entity";
import UserModel from "../../domain/models/user.model";
import UserRepository from "../../domain/repositories/user.repository";
import ClientUserRemote from "../remotes/user.remote";

export default class UserService extends UserRepository {
    private static _instance: UserService | null = null;
    private _clientUserRemote?: ClientUserRemote = new ClientUserRemote();

    private constructor() {
        super();
    }

    static getInstance(): UserService {
            UserService._instance = new UserService();
        return UserService._instance;
    }

    async getUsers(roles?: UserRole[], superId?: string): Promise<UserModel[]> {
        let response = await this._clientUserRemote!.getUsers(roles,superId);
        return response.data;
    }
    async getUsersOfClient(clientId: string,superId?:string): Promise<UserModel[]> {
        let response = await this._clientUserRemote!.getUsersOfClient(clientId,superId);
        return response.data;
    }
}