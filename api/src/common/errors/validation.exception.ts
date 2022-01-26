import { ValidationError } from "@nestjs/common";
import { CometException } from "@src/common/errors/comet.exception";

export class CometValidationException extends CometException {
    constructor(message: string, readonly errors?: ValidationError[]) {
        super(message);
    }
}
