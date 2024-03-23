import UserEntity from "./user.entity";

export enum TaskStatus {
    pending = "Pending",
    done = "Done",
    ignored = "Ignored",
    cancelled = "Cancelled",
}


export default class TaskEntity {
    _id?: string;
    action?: string;
    task?: string;
    region?: string;
    startDate?: Date;
    endDate?: Date;
    targetRemark?: string;
    assignerRemark?: string;
    status?: TaskStatus;
    assigner?: UserEntity;
    target?: UserEntity;
    cancelMessage?: string;


    constructor(data?: Partial<TaskEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): TaskEntity {
        const startDate = json.startDate ? new Date(json.startDate) : undefined;
        const endDate = json.endDate ? new Date(json.endDate) : undefined;
        return new TaskEntity({ ...json, startDate, endDate });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<TaskEntity>): TaskEntity {
        return new TaskEntity({ ...this, ...data });
    }

}