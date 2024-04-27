import { Api } from "../../../../core/api/api.source";
import SpecialityEntity, { SpecialityType } from "../../../../core/entities/speciality.entity";
import ResponseEntity from "../../../../core/entities/response.entity";

export default class SpecialityRemote {

    async getSpecialities(type: SpecialityType, isDrafted: boolean): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/dashboard/specialities`,
                {
                    params: {
                        type: type,
                        isDrafted: isDrafted,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            if (response.status == 200) {
                let specialities = response.data.map((json: any) => SpecialityEntity.fromJson(json))
                return new ResponseEntity({ code: response.status, data: specialities });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }

    async createSpeciality(speciality: SpecialityEntity): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');

        try {
            var response = await Api.instance.getAxios().post(`/dashboard/specialities`,
                {
                    name: speciality.name,
                    type: speciality.type,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            if (response.status == 200) {
                return new ResponseEntity({ code: response.status, data: true });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
    async updateSpeciality(speciality: SpecialityEntity): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');

        try {
            var response = await Api.instance.getAxios().put(`/dashboard/specialities/${speciality._id}`,
                {
                    name: speciality.name,
                    type: speciality.type,
                    isDrafted: speciality.isDrafted,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            if (response.status == 200) {
                return new ResponseEntity({ code: response.status, data: true });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
}
