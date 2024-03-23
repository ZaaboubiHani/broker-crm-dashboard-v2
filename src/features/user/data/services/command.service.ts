import CommandModel from "../../domain/models/command.model";
import CommandRespository from "../../domain/repositories/command.repository";
import CommandRemote from "../remotes/command.remote";

export default class CommandService extends CommandRespository {
    private static _instance: CommandService | null = null;
    private _commandRemote?: CommandRemote = new CommandRemote();

    private constructor() {
        super();
    }

    static getInstance(): CommandService {
            CommandService._instance = new CommandService();
        return CommandService._instance;
    }

    async getCommand(id: string): Promise<CommandModel> {
        let response = await this._commandRemote!.getCommand(id);
        return response.data;
    }
}