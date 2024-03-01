import ClientEntity from "./client.entity";
import CommandEntity from "./command.entity";
import ReportEntity from "./report.entity";
import UserEntity from "./user.entity";


export enum VisitState {
    planned = 'Planned',
    done = 'Done',
    hold = 'Hold',
}


export default class VisitEntity {
    _id?: string;
    user?: UserEntity;
    client?: ClientEntity;
    report?: ReportEntity;
    command?: CommandEntity;
    commandId?: string;
    reportId?: string;
    visitDate?: Date;
    state?: VisitState;

    constructor(data?: Partial<VisitEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): VisitEntity {
        const visitDate = json.visitDate ? new Date(json.visitDate) : undefined;
        const reportId = json.report;
        const commandId = json.command;
        return new VisitEntity({ ...json, visitDate, reportId, commandId });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<VisitEntity>): VisitEntity {
        return new VisitEntity({ ...this, ...data });
    }

}