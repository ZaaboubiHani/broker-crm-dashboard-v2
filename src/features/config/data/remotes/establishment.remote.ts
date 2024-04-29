import { Api } from "../../../../core/api/api.source";
import EstablishmentEntity from "../../../../core/entities/establishment.entity";
import ResponseEntity from "../../../../core/entities/response.entity";
export default class EstablishmentRemote {
    async getEstablishments(isDrafted: boolean): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/dashboard/establishments`, {
                params: {
                    isDrafted: isDrafted,
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let establishments = response.data.map((json: any) => EstablishmentEntity.fromJson(json))
                return new ResponseEntity({ code: response.status, data: establishments });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
    async createEstablishment(establishment:EstablishmentEntity): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().post(`/dashboard/establishments`,
            establishment, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                return new ResponseEntity({ code: response.status, data: {} });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
    async updateEstablishment(establishment:EstablishmentEntity): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().put(`/dashboard/establishments/${establishment._id}`,
            establishment, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                return new ResponseEntity({ code: response.status, data: {} });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
}