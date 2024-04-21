
import ResponseEntity from "../../../../core/entities/response.entity";
import CommentEntity from "../../../../core/entities/comment.entity";
import { Api } from "../../../../core/api/api.source";

export default class CommentRemote {
    async getComments(isDrafted: boolean): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/dashboard/comments?isDrafted=${isDrafted}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let comments: CommentEntity[] = [];
                comments = response.data.docs.map((json: any) => CommentEntity.fromJson(json));
                return new ResponseEntity({ code: response.status, data: comments });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
    async createComment(content: string): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().post(`/dashboard/comments`, {
                comment: content
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                return new ResponseEntity({ code: response.status, data: {} });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }

    async updateComment(comment: CommentEntity): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().put(`/dashboard/comments/${comment._id}`, {
                comment: comment.comment,
                isDrafted: comment.isDrafted,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                let updatedComment = CommentEntity.fromJson(response.data);
                return new ResponseEntity({ code: response.status, data: updatedComment });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }



}