
import { Api } from "../../../../core/api/api.source";
import ResponseEntity from "../../../../core/entities/response.entity";

export default class UserTrackingRemote {
    async getUserTracking(): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().post(`/dashboard/userTrackings`, {
               
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {

                // let userTrackings: UserTrackingEntity[] = [];
                // userTrackings = response.data.map((data: any) => UserTrackingEntity.fromJson(data));
                return new ResponseEntity({ code: response.status, data: {} });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
}