
import { Api } from "../../../../core/api/api.source";
import ResponseEntity from "../../../../core/entities/response.entity";
import UserEntity, { UserRole } from "../../../../core/entities/user.entity";

export default class UserRemote {
    async getUsers(roles?: UserRole[]): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().post(`/dashboard/users`, {
                roles: roles,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {

                let users: UserEntity[] = [];
                users = response.data.map((data: any) => UserEntity.fromJson(data));
                return new ResponseEntity({ code: response.status, data: users });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            if(error?.response?.status){
                return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
            }
            return new ResponseEntity({ code: -1, message: 'Failed to retrieve data' });
        }
    }
}