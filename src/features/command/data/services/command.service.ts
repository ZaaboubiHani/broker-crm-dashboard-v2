import { CommandStatus } from "../../../../core/entities/command.entity";
import CommandModel from "../../domain/models/command.model";
import CommandRepository from "../../domain/repositories/command.repository";
import CommandRemote from "../remotes/command.remote";

export default class CommandService extends CommandRepository {
    private static _instance: CommandService | null = null;
    private _commandRemote?: CommandRemote = new CommandRemote();

    private constructor() {
        super();
    }

    static getInstance(): CommandService {
            CommandService._instance = new CommandService();
        return CommandService._instance;
    }

    async getCommands(date: Date, page: number, size: number, userId?: string): Promise<{ commands: CommandModel[], total: number }> {
        let response = await this._commandRemote!.getCommands(date, page, size, userId);
        return response.data;
    }
    async updateCommandStatus(status: CommandStatus,commandId: string, supplierId?: string): Promise<boolean> {
        let response = await this._commandRemote!.updateCommandStatus(status, commandId, supplierId);
        return response.data;
    }
   
}