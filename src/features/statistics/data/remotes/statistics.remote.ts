
import { Api } from "../../../../core/api/api.source";
import ResponseEntity from "../../../../core/entities/response.entity";

export default class StatisticsRemote {
    async getUserStats(userId: string, date: Date): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/year/delegate/yearlyStats`, {
                params: {
                    year: date.getFullYear(),
                    userId: userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {

                return new ResponseEntity({ code: response.status, data: response.data });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
    async getTeamStats(superId: string, date: Date): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/year/supervisor/yearlyStats`, {
                params: {
                    year: date.getFullYear(),
                    supervisorId: superId,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {

                return new ResponseEntity({ code: response.status, data: response.data });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
    async getCompanyStats(date: Date): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/year/admin/yearlyStats`, {
                params: {
                    year: date.getFullYear(),
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {

                return new ResponseEntity({ code: response.status, data: response.data });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }

    async getContributionUser(userId: string, date: Date): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/year/delegate/contributionchiffredaffaireannuel`, {
                params: {
                    year: date.getFullYear(),
                    userId: userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {

                return new ResponseEntity({ code: response.status, data: response.data });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
    async getContributionCompany(date: Date): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/year/admin/contributionchiffredaffaireannuel`, {
                params: {
                    year: date.getFullYear(),
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {

                return new ResponseEntity({ code: response.status, data: response.data });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }

    async getContributionsUsers(superId: string, date: Date): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/year/supervisor/contributionChiffreDaffaireAnnuel`, {
                params: {
                    year: date.getFullYear(),
                    supervisorId: superId,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {

                return new ResponseEntity({ code: response.status, data: response.data });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
    async getContributionTeam(superId: string, date: Date): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/stats/year/supervisor/contributionEquipeAnnuel`, {
                params: {
                    year: date.getFullYear(),
                    supervisorId: superId,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {

                return new ResponseEntity({ code: response.status, data: response.data });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
}