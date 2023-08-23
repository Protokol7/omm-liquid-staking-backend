export class ErrorResponse {
    statusCode: number;
    path: string;
    errorType: string;
    errorMessage: string;

    constructor(statusCode: number, path: string, errorType: string, errorMessage: string) {
        this.statusCode = statusCode;
        this.path = path;
        this.errorType = errorType;
        this.errorMessage = errorMessage;
    }
}
