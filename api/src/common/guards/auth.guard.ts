import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { firebaseApp } from "@src/app.module";
import { User } from "@src/users/entities/user.entity";
import { Request } from "express";
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
                await firebaseApp.auth().verifyIdToken(token);
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
        return false;
    }
}
