import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
} from "@nestjs/common";
import { ErrorResponse } from "../models/class/ErrorResponse";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: InternalServerErrorException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        /**
         * @description Exception json response
         * @param message
         */
        const responseMessage = (type, message) => {
            response.status(status).json(new ErrorResponse(status, request.url, type, message));
        };

        // Throw an exceptions for either
        // MongoError, ValidationError, TypeError, CastError and Error
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (exception.message.error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            responseMessage("Error", exception.message.error);
        } else {
            responseMessage(exception.name, exception.message);
        }
    }
}
