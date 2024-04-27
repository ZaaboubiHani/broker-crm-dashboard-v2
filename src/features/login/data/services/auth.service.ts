
import UserModel from "../../domain/models/user.model";
import AuthRepository from "../../domain/repositories/auth.repository";
import AuthRemote from "../remotes/auth.remote";


export default class AuthService extends AuthRepository {

    private static _instance: AuthService | null = null;
    private _authRemote: AuthRemote = new AuthRemote();

    private constructor() {
        super();
    }

    static getInstance(): AuthService{
        if (!AuthService._instance) {
            AuthService._instance = new AuthService();
        }
        return AuthService._instance;
    }

    async getMe(): Promise<UserModel | undefined> {
        let response = await this._authRemote.getMe();
        return response.data;
    }

    async login(identifier: string, password: string): Promise<boolean> {
        let response = await this._authRemote.login(identifier, password);
        return response.data;
    }
}