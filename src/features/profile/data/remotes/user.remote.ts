
import UserEntity from "../../../../core/entities/user.entity";
import ResponseEntity from "../../../../core/entities/response.entity";
import { Api } from "../../../../core/api/api.source";

export default class UserRemote {
    async getAllUsers(): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().post(`/dashboard/users`,{}, {
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

    async createUser(user: UserEntity): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().post(`/dashboard/users/register`, {
                username: user.username,
                password: user.password,
                role: user.role,
                fullName: user.fullName,
                phonePersonal: user.phonePersonal,
                phoneProfessional: user.phoneProfessional,
                address: user.address,
                wilaya: user.wilaya,
                commune: user.commune,
                email: user.email,
                wilayas: user.wilayas?.map((w)=>w._id),
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status >= 200 && response.status < 300) {
                let user = UserEntity.fromJson(response.data);
                return new ResponseEntity({ code: response.status, data: user });
            }
            return new ResponseEntity({ code: response.status, data: undefined });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: undefined });
        }
    }
    async updateUser(user: UserEntity): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        let wilayas = user.wilayas?.map((w)=>w._id);
        try {
            var response = await Api.instance.getAxios().put(`/users/${user._id}`, {
                username: user.username,
                password: user.password,
                fullName: user.fullName,
                phonePersonal: user.phonePersonal,
                phoneProfessional: user.phoneProfessional,
                address: user.address,
                wilaya: user.wilaya,
                commune: user.commune,
                email: user.email,
                isBlocked: user.isBlocked,
                createdBy: user.createdBy,
                wilayas: wilayas,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status >= 200 && response.status < 300) {
                return new ResponseEntity({ code: response.status, data: true });
            }
            return new ResponseEntity({ code: response.status, data: false });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: false });
        }
    }
    async getSupervisors(): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
       
        try {
            var response = await Api.instance.getAxios().get(`/dashboard/users/supervisors`, {
                headers: {
                    'Authorization': `Bearer ${token}`
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