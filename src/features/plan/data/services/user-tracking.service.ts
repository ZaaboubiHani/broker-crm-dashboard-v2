import UserTrackingRespository from "../../domain/repositories/user-tracking.repository";
import UserTrackingRemote from "../remotes/user-tracking.remote";


export default class UserTrackingService extends UserTrackingRespository {
    private static _instance: UserTrackingService | null = null;
    private _userTrackingRemote?: UserTrackingRemote = new UserTrackingRemote();

    private constructor() {
        super();
    }

    static getInstance(): UserTrackingService {
        if (!UserTrackingService._instance) {
            UserTrackingService._instance = new UserTrackingService();

        }
        return UserTrackingService._instance;
    }

}