
import MotivationModel from "../../domain/models/motivation.model";
import MotivationRespository from "../../domain/repositories/motivation.repository";
import MotivationRemote from "../remotes/motivation.remote";


export default class MotivationService extends MotivationRespository {
    private static _instance: MotivationService | null = null;
    private _motivationRemote?: MotivationRemote = new MotivationRemote();

    private constructor() {
        super();
    }

    static getInstance(): MotivationService {
        MotivationService._instance = new MotivationService();
        return MotivationService._instance;
    }

    async getAllMotivations(): Promise<MotivationModel[]> {
        let response = await this._motivationRemote!.getMotivations(false);
        return response.data;
    }
    async getAllDraftedMotivations(): Promise<MotivationModel[]> {
        let response = await this._motivationRemote!.getMotivations(true);
        return response.data;
    }

    async updateMotivation(motivation: MotivationModel): Promise<MotivationModel> {
        motivation.isDrafted = false;
        let response = await this._motivationRemote!.updateMotivation(motivation);
        return response.data;
    }
    async draftMotivation(motivationId: string): Promise<MotivationModel> {
        let motivation = new MotivationModel({ _id: motivationId, isDrafted: true });
        let response = await this._motivationRemote!.updateMotivation(motivation);
        return response.data;
    }
    async undraftMotivation(motivationId: string): Promise<MotivationModel> {
        let motivation = new MotivationModel({ _id: motivationId, isDrafted: false });
        let response = await this._motivationRemote!.updateMotivation(motivation);
        return response.data;
    }
    async createMotivation(motivation: string): Promise<MotivationModel> {
        let response = await this._motivationRemote!.createMotivation(motivation);
        return response.data;
    }
}