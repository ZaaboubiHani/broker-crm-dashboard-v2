export default class ResponseEntity{
    code?: number;
    message?: string;
    data?: any;

    constructor(data?: Partial<ResponseEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}