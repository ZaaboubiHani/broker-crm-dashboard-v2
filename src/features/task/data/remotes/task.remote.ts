
import { Api } from "../../../../core/api/api.source";
import ResponseEntity from "../../../../core/entities/response.entity";
import TaskEntity from "../../../../core/entities/task.entity";

export default class TaskRemote {
    async createTask(task: TaskEntity): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().post(`/dashboard/todos`, {
                action: task?.action,
                task: task?.task,
                region: task?.region,
                startDate: task?.startDate,
                endDate: task?.endDate,
                remark: task?.assignerRemark,
                target: task?.target?._id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
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
    async getTasks(date: Date, userId: string, page: number, size: number, order: boolean, field?: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/dashboard/todos`, {
                params: {
                    year: date.getFullYear().toString(),
                    month: (date.getMonth() + 1).toString(),
                    user: userId,
                    sortBy: field,
                    limit: size,
                    page: page,
                    sortDirection: order ? "asc" : 'desc',
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let tasks: TaskEntity[] = [];
                tasks = response.data.docs.map((data: any) => TaskEntity.fromJson(data));
                return new ResponseEntity({ code: response.status, data: { tasks: tasks, total: response.data.totalDocs } });
            }
            return new ResponseEntity({ code: response.status, data: { tasks: [], total: 0 } });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: { tasks: [], total: 0 } });
        }
    }
    async cancelTask(taskId: string, cancelMessage: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().put(`/dashboard/todos/${taskId}`, {
                cancelMessage: cancelMessage,
                status: 'Cancelled'
            }, {

                headers: {
                    Authorization: `Bearer ${token}`
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