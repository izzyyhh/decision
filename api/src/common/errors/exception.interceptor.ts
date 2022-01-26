import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    HttpException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NestInterceptor,
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { CometException } from "@src/common/errors/comet.exception";
import { CometValidationException } from "@src/common/errors/validation.exception";
import { configNS } from "@src/config/config.namespace";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

// Inspired by https://docs.nestjs.com/interceptors#more-operators
@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
    constructor(@Inject(configNS.KEY) private readonly config: ConfigType<typeof configNS>) {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof CometException) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const errorObject: any = { statusCode: 400, message: error.message, error: error.constructor.name, validationErrors: [] };
                    if (error instanceof CometValidationException) {
                        errorObject.validationErrors = error.errors;
                    }
                    // Business-Logic-Level errors should be handled by the client itself and should not be considered as "server-errors"
                    return throwError(new BadRequestException(errorObject));
                } else if (error instanceof HttpException) {
                    // Nest-HttpExceptions are thrown as they are (mostly directly from the resolver)
                    return throwError(error);
                }
                // Every unhandled exception is converted to an Internal Server Error (500)

                console.error(error); // log error to help debugging

                return throwError(this.config.debug ? error : new InternalServerErrorException());
            }),
        );
    }
}
