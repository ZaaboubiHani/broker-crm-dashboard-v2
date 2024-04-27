
import CommentModel from "../../domain/models/comment.model";
import CommentRepository from "../../domain/repositories/comment.repository";
import CommentRemote from "../remotes/comment.remote";


export default class CommentService extends CommentRepository {
    private static _instance: CommentService | null = null;
    private _commentRemote?: CommentRemote = new CommentRemote();

    private constructor() {
        super();
    }

    static getInstance(): CommentService {
            CommentService._instance = new CommentService();
        return CommentService._instance;
    }

    async getAllComments(): Promise<CommentModel[]> {
        let response = await this._commentRemote!.getComments(false);
        return response.data;
    }
    async getAllDraftedComments(): Promise<CommentModel[]> {
        let response = await this._commentRemote!.getComments(true);
        return response.data;
    }

    async updateComment(comment:CommentModel): Promise<CommentModel> {
        comment.isDrafted = false;
        let response = await this._commentRemote!.updateComment(comment);
        return response.data;
    }
    async draftComment(comment:CommentModel): Promise<CommentModel> {
        comment.isDrafted = true;
        let response = await this._commentRemote!.updateComment(comment);
        return response.data;
    }
    async undraftComment(comment:CommentModel): Promise<CommentModel> {
        comment.isDrafted = false;
        let response = await this._commentRemote!.updateComment(comment);
        return response.data;
    }
    async createComment(comment:string): Promise<CommentModel> {
        let response = await this._commentRemote!.createComment(comment);
        return response.data;
    }
}
