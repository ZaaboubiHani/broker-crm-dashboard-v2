import UserModel from "../models/user.model";


export default abstract class AuthRespository {
    abstract login(identifier: string, password: string): Promise<boolean>;
    abstract getMe(): Promise<UserModel | undefined>;
}