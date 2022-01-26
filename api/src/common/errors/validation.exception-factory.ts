import { ValidationError } from "@nestjs/common";
import { CometValidationException } from "@src/common/errors/validation.exception";

export function exceptionFactory(errors: ValidationError[]): CometValidationException {
    return new CometValidationException("Validation failed", errors);
}
