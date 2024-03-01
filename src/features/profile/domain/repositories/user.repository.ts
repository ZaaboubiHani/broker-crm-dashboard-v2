import UserModel from "../models/user.model";


export default abstract class UserRespository {
    abstract getAllUsers(): Promise<UserModel[]>;
}