import UserModel from "../models/user.model";


export default abstract class UserRepository {
    abstract getAllUsers(): Promise<UserModel[]>;
}