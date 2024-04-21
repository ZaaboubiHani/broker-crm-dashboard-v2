
import FileRespository from "../../domain/repositories/file.repository";
import FileRemote from "../remotes/file.remote";


export default class FileService extends FileRespository {
    private static _instance: FileService | null = null;
    private _fileRemote?: FileRemote = new FileRemote();

    private constructor() {
        super();
    }

    static getInstance(): FileService {
            FileService._instance = new FileService();
        return FileService._instance;
    }

    async uploadFile(file:File): Promise<string> {
        let response = await this._fileRemote!.uploadFile(file);
        return response.data;
    }
}