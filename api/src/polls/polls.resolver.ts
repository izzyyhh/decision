import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { PollInput } from "./dto/poll.input";
import { Poll } from "./entities/poll.entity";
import { PollsService } from "./polls.service";

@Resolver(() => Poll)
export class PollsResolver {
    constructor(private readonly pollsService: PollsService, @InjectRepository(Poll) private readonly repository: EntityRepository<Poll>) {}

    @Query(() => [Poll])
    async pollsAll(): Promise<Poll[]> {
        return this.repository.findAll();
    }

    @Mutation(() => Poll)
    async addPoll(@Args("data", { type: () => PollInput }) data: PollInput): Promise<Poll> {
        const entity = this.repository.create(data);
        await this.repository.persistAndFlush(entity);

        return entity;
    }
}
