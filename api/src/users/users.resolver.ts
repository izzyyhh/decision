import { EntityRepository } from "@mikro-orm/core";
import { Query, Resolver } from "@nestjs/graphql";

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
}
