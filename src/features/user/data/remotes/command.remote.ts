import { Api } from "../../../../core/api/api.source";
import CommandEntity from "../../../../core/entities/command.entity";
import ResponseEntity from "../../../../core/entities/response.entity";

export default class CommandRemote {
    async getCommand(id: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/commands/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let report: CommandEntity;
                report = CommandEntity.fromJson(response.data);
                return new ResponseEntity({ code: response.status, data: report });
            }
            return new ResponseEntity({ code: response.status, });
        } catch (error: any) {
            if (error?.response?.status) {
                return new ResponseEntity({ code: error.response.status, message: error.response.statusText });
            }
            return new ResponseEntity({ code: -1, message: 'Failed to retrieve data' });
        }
    }

}
