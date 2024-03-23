import { Api } from "../../../../core/api/api.source";
import ClientEntity, { ClientType } from "../../../../core/entities/client.entity";
import ResponseEntity from "../../../../core/entities/response.entity";

export default class ClientRemote {
    async getClients(type: ClientType): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/dashboard/clients/filter`, {
                params: {
                    type: type,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let clients: ClientEntity[] = [];
                clients = response.data.map((data: any) => ClientEntity.fromJson(data));
                return new ResponseEntity({ code: response.status, data: clients });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
}
