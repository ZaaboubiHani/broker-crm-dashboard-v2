
import { SpecialityType } from "../../../../core/entities/speciality.entity";
import SpecialityModel from "../../domain/models/speciality.model";
import SpecialityRepository from "../../domain/repositories/speciality.repository";
import SpecialityRemote from "../remotes/speciality.remote";


export default class SpecialityService extends SpecialityRepository {
    private static _instance: SpecialityService | null = null;
    private _specialityRemote?: SpecialityRemote = new SpecialityRemote();

    private constructor() {
        super();
    }

    static getInstance(): SpecialityService {
        SpecialityService._instance = new SpecialityService();
        return SpecialityService._instance;
    }

    async getSpecialities(type: SpecialityType, isDrafted: boolean): Promise<SpecialityModel[]> {
        let response = await this._specialityRemote!.getSpecialities(type, isDrafted);
        return response.data;
    }

    async updateSpeciality(speciality: SpecialityModel): Promise<SpecialityModel[]> {
        let response = await this._specialityRemote!.updateSpeciality(speciality);
        return response.data;
    }
    async createSpeciality(speciality: SpecialityModel): Promise<SpecialityModel[]> {
        let response = await this._specialityRemote!.createSpeciality(speciality);
        return response.data;
    }
}