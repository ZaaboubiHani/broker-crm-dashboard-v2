
import ResponseEntity from "../../../../core/entities/response.entity";
import MotivationEntity from "../../../../core/entities/motivation.entity";
import { Api } from "../../../../core/api/api.source";

export default class MotivationRemote {
    async getMotivations(isDrafted?: boolean): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/dashboard/motivations?isDrafted=${isDrafted}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let motivations: MotivationEntity[] = [];
                motivations = response.data.docs.map((json: any) => MotivationEntity.fromJson(json));
                return new ResponseEntity({ code: response.status, data: motivations });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
    async createMotivation(content: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().post(`/dashboard/motivations`, {
                motivation: content
            }, {
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

    async updateMotivation(motivation: MotivationEntity): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().put(`/dashboard/motivations/${motivation._id}`, {
                motivation: motivation.motivation,
                isDrafted: motivation.isDrafted,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let updatedMotivation = MotivationEntity.fromJson(response.data);
                return new ResponseEntity({ code: response.status, data: updatedMotivation });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }



}