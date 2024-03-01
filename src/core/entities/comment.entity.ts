

export default class CommentEntity {
    _id?: string;
    comment?: string;
    isDrafted?: boolean;

    constructor(data?: Partial<CommentEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): CommentEntity {
       
        return new CommentEntity({ ...json });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<CommentEntity>): CommentEntity {
        return new CommentEntity({ ...this, ...data });
    }

}