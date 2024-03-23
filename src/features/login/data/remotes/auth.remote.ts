
import UserModel from "../../domain/models/user.model";
import ResponseEntity from "../../../../core/entities/response.entity";
import Globals from "../../../../core/api/globals";
import { Api } from "../../../../core/api/api.source";

export default class AuthRemote {

    async getMe(): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/users/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            if (response.status >= 200 && response.status < 300) {
                var user = UserModel.fromJson(response.data);
                user.token = token ?? undefined;
                return new ResponseEntity({ code: response.status, data: user });
            }
            return new ResponseEntity({ code: response.status, message: 'failed to receive or convert data' });
        } catch (error: any) {
            if(error?.response?.status){

                if (error.response.status === 401) {
                    return new ResponseEntity({ code: 401, data: new UserModel({ isBlocked: true }) });
                }
                return new ResponseEntity({ code: error.response.status, message: error.response.message });
            }
            return new ResponseEntity({ code: -1, message: 'Failed to retrieve data' });
        }
    }

    async login(identifier: string, password: string): Promise<ResponseEntity> {
        try {
            var response = await Api.instance.getAxios().post(`${Globals.apiUrl}/users/login`,
                {
                    identifier: identifier,
                    password: password
                });
            if (response.status == 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('isLogged', 'true');
                return new ResponseEntity({ code: response.status, data: true });
            }
            return new ResponseEntity({ code: response.status, data: false });
        } catch (error: any) {
            if(error?.response?.status){
                return new ResponseEntity({ code: error.response.status, message: error.response.message });
            }
            return new ResponseEntity({ code: -1, message: 'Failed to retrieve data' });
        }
    }
}