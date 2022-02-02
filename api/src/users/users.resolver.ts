import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { firebaseApp } from "@src/app.module";
import { AuthGuard } from "@src/common/guards/auth.guard";

import { UserInput } from "./dto/user.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService, @InjectRepository(User) private readonly repository: EntityRepository<User>) {}

    @Query(() => [User])
    async usersAll(): Promise<User[]> {
        return this.repository.findAll();
    }

    @Mutation(() => User)
    async addUser(@Args("data", { type: () => UserInput }) data: UserInput): Promise<User> {
        const entity = this.repository.create(data);
        await this.repository.persistAndFlush(entity);

        // Todo add catch
        const entityWithToken = await firebaseApp
            .auth()
            .createCustomToken(entity.id)
            .then(async (customToken: string) => {
                const entityUpdate = await this.repository.findOneOrFail(entity.id);
                entityUpdate.assign({ token: customToken });
                this.repository.persistAndFlush(entityUpdate);
                return entityUpdate;
            });

        return entityWithToken;
    }

    @Query(() => Boolean)
    @UseGuards(AuthGuard)
    async checkToken(): Promise<boolean> {
        return true;
    }
}
