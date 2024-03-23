import TaskModel from "../../domain/models/task.model";
import TaskRespository from "../../domain/repositories/task.repository";
import TaskRemote from "../remotes/task.remote";

export default class TaskService extends TaskRespository {
    private static _instance: TaskService | null = null;
    private _taskRemote?: TaskRemote = new TaskRemote();

    private constructor() {
        super();
    }

    static getInstance(): TaskService {
            TaskService._instance = new TaskService();
        return TaskService._instance;
    }

    async createTask(task: TaskModel): Promise<boolean> {
        let response = await this._taskRemote!.createTask(task);
        return response.data;
    }
    async getTasks(date: Date, userId: string, page: number, size: number, order: boolean, field?: string): Promise<{ tasks: TaskModel[], total: number }> {
        let response = await this._taskRemote!.getTasks(date, userId, page, size, order, field);
        return response.data;
    }
    async cancelTask(taskId: string, cancelMessage: string): Promise<{ tasks: TaskModel[], total: number }> {
        let response = await this._taskRemote!.cancelTask(taskId, cancelMessage);
        return response.data;
    }
}