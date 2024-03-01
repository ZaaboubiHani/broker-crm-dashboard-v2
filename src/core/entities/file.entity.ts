

export default class FileEntity {
    _id?: string;
    url?: string;

    constructor(data?: Partial<FileEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): FileEntity {
       
        return new FileEntity({ ...json });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<FileEntity>): FileEntity {
        return new FileEntity({ ...this, ...data });
    }

}