import { EntityRepository } from "@mikro-orm/core";
import { Query, Resolver } from "@nestjs/graphql";

import { Poll } from "./entities/poll.entity";
import { PollsService } from "./polls.service";

@Resolver(() => Poll)
export class PollsResolver {
    repository: EntityRepository<Poll>;

    constructor(private readonly pollsService: PollsService) {}

    @Query(() => [Poll])
    async pollsAll(): Promise<Poll[]> {
        return this.repository.findAll();
    }
}
