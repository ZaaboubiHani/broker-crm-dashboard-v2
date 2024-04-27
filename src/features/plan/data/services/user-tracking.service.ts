import UserTrackingModel from "../../domain/models/user-tracking.model";
import UserTrackingRepository from "../../domain/repositories/user-tracking.repository";
import UserTrackingRemote from "../remotes/user-tracking.remote";


export default class UserTrackingService extends UserTrackingRepository {
    private static _instance: UserTrackingService | null = null;
    private _userTrackingRemote?: UserTrackingRemote = new UserTrackingRemote();

    private constructor() {
        super();
    }

    static getInstance(): UserTrackingService {
        UserTrackingService._instance = new UserTrackingService();
        return UserTrackingService._instance;
    }
    async getUserTracking(date: Date, userId: string): Promise<{ userTrackings: UserTrackingModel[], tasksTracking: { fullName: string, point: number[] }[], visitsTracking: { point: number[], fullName: string, createdAt: string }[] }> {
        let response = await this._userTrackingRemote!.getUserTracking(date, userId);
        return response.data;
    }
}