import { Api } from "../../../../core/api/api.source";
import CommandEntity from "../../../../core/entities/command.entity";
import ResponseEntity from "../../../../core/entities/response.entity";

export default class CommandRemote {
    async getCommands(date: Date, page: number, size: number, userId?: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().post(`/dashboard/commands`, {
                year: date.getFullYear().toString(),
                month: (date.getMonth() + 1).toString(),
                limit: size,
                page: page,
                user: userId,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let commands: CommandEntity[] = [];
                commands = response.data.docs.map((data: any) => CommandEntity.fromJson(data));
                return new ResponseEntity({ code: response.status, data: { commands: commands, total: response.data.totalDocs } });
            }
            return new ResponseEntity({ code: response.status, data: { commands: [], total: 0 } });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: { commands: [], total: 0 } });
        }
    }

    async honorCommand(isHonored: boolean, commandId: string, supplierId?: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().put(`/commands/${commandId}`, {
                isHonored: isHonored,
                finalSupplier: supplierId ?? null,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == 200) {
               
                return new ResponseEntity({ code: response.status, data: true });
            }
            return new ResponseEntity({ code: response.status, data: false });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: false });
        }
    }
}
