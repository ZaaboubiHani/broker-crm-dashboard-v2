
import { Api } from "../../../../core/api/api.source";
import ResponseEntity from "../../../../core/entities/response.entity";
import UserTrackingEntity from "../../../../core/entities/user-tracking.entity";
import { formatDateToYYYYMMDD } from "../../../../core/functions/date-format";

export default class UserTrackingRemote {
    async getUserTracking(date: Date, userId: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/dashboard/trackings`, {
                params: {
                    date: formatDateToYYYYMMDD(date),
                    user: userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {

                let userTrackings: UserTrackingEntity[] = [];
                let tasksTracking: { fullName: string, point: number[] }[] = [];
                let visitsTracking: { point: number[], fullName: string, createdAt: string }[] = [];
                userTrackings = response.data.trackings.map((data: any) => UserTrackingEntity.fromJson(data));
                tasksTracking = response.data.tasksTracking.map((data: any) => {return  { fullName: data.fullName, point: data.location.split(',').map((p: string) => parseFloat(p.trim())) };});
                visitsTracking = response.data.visitsTracking.map((data: any) =>{
                    const createdAt = data.createdAt ? new Date(data.createdAt) : undefined;
                    createdAt?.setHours(createdAt.getHours() + 1);
                    return { fullName: data.fullName, point: data.location.split(',').map((p: string) => parseFloat(p.trim())), createdAt: formatDateToYYYYMMDD(createdAt!) };
                });
                return new ResponseEntity({ code: response.status, data: { userTrackings: userTrackings, tasksTracking: tasksTracking, visitsTracking: visitsTracking } });
            }
            return new ResponseEntity({ code: response.status, data: {} });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: {} });
        }
    }
}