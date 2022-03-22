import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "@src/users/entities/user.entity";
import { Request } from "express";
import jwt, { JwtPayload, VerifyOptions } from "jsonwebtoken";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@InjectRepository(User) private readonly usersRepository: EntityRepository<User>) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        if (process.env.NODE_ENV === "development") {
            return true;
        }
        const ctx = GqlExecutionContext.create(context);
        const req: Request = ctx.getContext().req;
        return this.validateRequest(req);
    }

    async validateRequest(request: Request): Promise<boolean> {
        const authHeader = request.headers.authorization;

        if (authHeader?.startsWith("Bearer ")) {
            const token: string = authHeader.split(" ")[1];

            try {
                const verifiedEntity: JwtPayload = jwt.verify(
                    token,
                    Buffer.from(process.env.FIREBASE_PRIVATE_KEY as string, "base64").toString("utf-8"),
                    { algorithms: ["RS256"] } as VerifyOptions,
                ) as JwtPayload;

                await this.usersRepository.findOneOrFail(verifiedEntity.uid);
                return true;
            } catch (error) {
                return false;
            }
        }
        return false;
    }
}
