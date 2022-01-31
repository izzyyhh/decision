import { EntityRepository } from "@mikro-orm/postgresql";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { firebaseApp } from "@src/app.module";
import { v4 } from "uuid";
import { UserInput } from "./dto/user.input";

import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
    repository: EntityRepository<User>;

    constructor(private readonly usersService: UsersService) {}

    @Query(() => [User])
    async usersAll(): Promise<User[]> {
        return this.repository.findAll();
    }

    @Mutation(() => User)
    async addUser(@Args("data", { type: () => UserInput }) data: UserInput): Promise<User> {
        const entity = this.repository.create(data);
        await this.repository.persistAndFlush(entity);

        firebaseApp.auth().createCustomToken(entity.id)
            .then( async (customToken) => {
                const entityUpdate = await this.repository.findOneOrFail(entity.id);
                entityUpdate.assign({ token: customToken });
                return entityUpdate;
            })
        
        return entity;
    }

}
