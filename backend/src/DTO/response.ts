
export class ResponseDTO {
    success: boolean;
    data: any;
    constructor(success: boolean, data: any) {
        this.success = success
        this.data = data
    }
}