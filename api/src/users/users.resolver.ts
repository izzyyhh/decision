import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "@src/common/guards/auth.guard";

import { UserInput } from "./dto/user.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => [User])
    async usersAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Mutation(() => User)
    async addUser(@Args("data", { type: () => UserInput }) data: UserInput): Promise<User> {
        return this.usersService.create(data);
    }

    @Query(() => Boolean)
    @UseGuards(AuthGuard)
    async checkToken(): Promise<boolean> {
        return true;
    }
}
