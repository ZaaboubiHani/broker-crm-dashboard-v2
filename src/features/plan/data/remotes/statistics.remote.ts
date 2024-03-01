
import { Api } from "../../../../core/api/api.source";
import ResponseEntity from "../../../../core/entities/response.entity";

export default class StatisticsRemote {
    async getPlandetournee(date: Date, userId: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/month/delegate/plandetournee`, {
                params:{
                    year: date.getFullYear(),
                    month: (date.getMonth() + 1),
                    userId: userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                return new ResponseEntity({ code: response.status, data: response.data.result ?? 0 });
            }
            return new ResponseEntity({ code: response.status, data: 0 });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data:0 });
        }
    }
    async getMoyenneVisitesParJour(date: Date, userId: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/month/delegate/moyenneVisitesParJour`, {
                params:{
                    year: date.getFullYear(),
                    month: (date.getMonth() + 1),
                    userId: userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                return new ResponseEntity({ code: response.status, data: response.data.result ?? 0 });
            }
            return new ResponseEntity({ code: response.status, data: 0 });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data:0 });
        }
    }
    async getTauxdereussite(date: Date, userId: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/month/delegate/tauxdereussite`, {
                params:{
                    year: date.getFullYear(),
                    month: (date.getMonth() + 1),
                    userId: userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                return new ResponseEntity({ code: response.status, data: response.data.result ?? 0 });
            }
            return new ResponseEntity({ code: response.status, data: 0 });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data:0 });
        }
    }
    async getCouverturePortefeuilleClient(date: Date, userId: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/month/delegate/couverturePortefeuilleClient`, {
                params:{
                    year: date.getFullYear(),
                    month: (date.getMonth() + 1),
                    userId: userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                return new ResponseEntity({ code: response.status, data: response.data.result ?? 0 });
            }
            return new ResponseEntity({ code: response.status, data: 0 });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data:0 });
        }
    }
    async getObjectifChiffreDaffaire(date: Date, userId: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/month/delegate/objectifChiffreDaffaire`, {
                params:{
                    year: date.getFullYear(),
                    month: (date.getMonth() + 1),
                    userId: userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                return new ResponseEntity({ code: response.status, data: response.data.result ?? 0 });
            }
            return new ResponseEntity({ code: response.status, data: 0 });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data:0 });
        }
    }
    async getObjectifvisites(date: Date, userId: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/month/delegate/objectifvisites`, {
                params:{
                    year: date.getFullYear(),
                    month: (date.getMonth() + 1),
                    userId: userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                return new ResponseEntity({ code: response.status, data: response.data.result ?? 0 });
            }
            return new ResponseEntity({ code: response.status, data: 0 });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data:0 });
        }
    }
}