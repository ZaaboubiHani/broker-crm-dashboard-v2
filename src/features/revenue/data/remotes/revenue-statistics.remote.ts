
import { Api } from "../../../../core/api/api.source";
import ResponseEntity from "../../../../core/entities/response.entity";
import { UserRole } from "../../../../core/entities/user.entity";

export default class RevenueStatisticsRemote {
    async getTeamRevenue(date: Date, superId?: string, role?: UserRole): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/month/supervisor/supervisorChiffreDaffaireStats`, {
                params: {
                    year: date.getFullYear(),
                    month: (date.getMonth() + 1),
                    supervisorId: superId,
                    role: role,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                return new ResponseEntity({ code: response.status, data: response.data });
            }
            return new ResponseEntity({ code: response.status, data: {} });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: {} });
        }
    }

    async getUserRevenue(date: Date, userId?: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/month/delegate/delegateChiffreDaffaireStats`, {
                params: {
                    year: date.getFullYear(),
                    month: (date.getMonth() + 1),
                    userId: userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                return new ResponseEntity({ code: response.status, data: response.data });
            }
            return new ResponseEntity({ code: response.status, data: {} });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: {} });
        }
    }

    async getProdutRevenue(date: Date, userId?: string, isHonored?: boolean): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/month/delegate/venteparproduit`, {
                params: {
                    year: date.getFullYear(),
                    month: (date.getMonth() + 1),
                    userId: userId,
                    isHonored: isHonored,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                return new ResponseEntity({ code: response.status, data: response.data });
            }
            return new ResponseEntity({ code: response.status, data: {} });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: {} });
        }
    }

    async getWilayaRevenue(date: Date, userId?: string,isHonored?: boolean): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/month/delegate/venteparwilaya`, {
                params: {
                    year: date.getFullYear(),
                    month: (date.getMonth() + 1),
                    userId: userId,
                    isHonored: isHonored,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                return new ResponseEntity({ code: response.status, data: response.data });
            }
            return new ResponseEntity({ code: response.status, data: {} });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: {} });
        }
    }

}