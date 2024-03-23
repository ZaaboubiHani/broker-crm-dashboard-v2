import { Api } from "../../../../core/api/api.source";
import ClientEntity, { ClientType } from "../../../../core/entities/client.entity";
import ResponseEntity from "../../../../core/entities/response.entity";

export default class ClientRemote {
    async getClients(type: ClientType, fullName: string, page: number, size: number, order: boolean, field?: string, superId?: string, userId?: string,): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().post(`/dashboard/clients`, {
                fullName: fullName,
                type: type,
                page: page,
                limit: size,
                sortBy: field,
                sortDirection: order ? "asc" : "desc",
                supervisorId: superId,
                user: userId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let clients: ClientEntity[];
                clients = response.data.docs.map((data: any) => ClientEntity.fromJson(data));
                return new ResponseEntity({ code: response.status, data: { clients: clients, total: response.data.totalDocs } });
            }
            return new ResponseEntity({ code: response.status, data: { clients: [], total: 0 } });
        } catch (error: any) {
            if (error?.response?.status) {
                return new ResponseEntity({ code: error.response.status, message: error.response.statusText });
            }
            return new ResponseEntity({ code: -1, message: 'Failed to retrieve data' });
        }
    }
}
