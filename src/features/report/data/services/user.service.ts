import { UserRole } from "../../../../core/entities/user.entity";
import UserModel from "../../domain/models/user.model";
import UserRepository from "../../domain/repositories/user.repository";
import UserRemote from "../remotes/user.remote";

export default class UserService extends UserRepository {
    private static _instance: UserService | null = null;
    private _userRemote?: UserRemote = new UserRemote();

    private constructor() {
        super();
    }

    static getInstance(): UserService {
            UserService._instance = new UserService();
        return UserService._instance;
    }

    async getUsers(roles?: UserRole[], superId?: string): Promise<UserModel[]> {
        let response = await this._userRemote!.getUsers(roles,superId);
        return response.data;
    }
}