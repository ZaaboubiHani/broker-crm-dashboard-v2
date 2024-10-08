import WilayaModel from "../../domain/models/wilaya.model";
import WilayaRepository from "../../domain/repositories/wilaya.repository"
import WilayaRemote from "../remotes/wilaya.remote";

export default class WilayaService extends WilayaRepository {
    private static _instance: WilayaService | null = null;
    private _wilayaRemote: WilayaRemote = new WilayaRemote();

    private constructor() {
        super();
    }

    static getInstance(): WilayaService {
            WilayaService._instance = new WilayaService();
        return WilayaService._instance;
    }
    
    async getAllWilayas(): Promise<WilayaModel[]> {
        let response = await this._wilayaRemote.getAllWilayas();
        return response.data;
    }
}