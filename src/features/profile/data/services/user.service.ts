import UserModel from "../../domain/models/user.model";
import UserRespository from "../../domain/repositories/user.repository";
import UserRemote from "../remotes/user.remote";

export default class UserService extends UserRespository {
    private static _instance: UserService | null = null;
    private _userRemote?: UserRemote = new UserRemote();

    private constructor() {
        super();
    }

    static getInstance(): UserService {
            UserService._instance = new UserService();
        return UserService._instance;
    }
    
    async getAllUsers(): Promise<UserModel[]> {
        let response = await this._userRemote!.getAllUsers();
        return response.data;
    }
    async getSupervisors(): Promise<UserModel[]> {
        let response = await this._userRemote!.getSupervisors();
        return response.data;
    }
    async createUser(user:UserModel): Promise<UserModel | undefined> {
        let response = await this._userRemote!.createUser(user);
        return response.data;
    }
    async updateUser(user:UserModel): Promise<boolean> {
        let response = await this._userRemote!.updateUser(user);
        return response.data;
    }
}