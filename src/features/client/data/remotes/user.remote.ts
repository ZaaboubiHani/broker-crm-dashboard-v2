
import { Api } from "../../../../core/api/api.source";
import ResponseEntity from "../../../../core/entities/response.entity";
import UserEntity, { UserRole } from "../../../../core/entities/user.entity";

export default class ClientUserRemote {
    
    async getUsers(roles?: UserRole[], superId?: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().post(`/dashboard/users`, {
                roles: roles,
                supervisorId: superId,
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
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }

    async getUsersOfClient(clientId: string,superId?:string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/dashboard/clients/users`, {
                params: {
                    client: clientId,
                    superId: superId,
                },
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
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
}