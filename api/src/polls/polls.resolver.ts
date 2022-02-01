import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Query, Resolver } from "@nestjs/graphql";

import { Poll } from "./entities/poll.entity";
import { PollsService } from "./polls.service";

@Resolver(() => Poll)
export class PollsResolver {
    constructor(private readonly pollsService: PollsService, @InjectRepository(Poll) private readonly repository: EntityRepository<Poll>) {}

    @Query(() => [Poll])
    async pollsAll(): Promise<Poll[]> {
        return this.repository.findAll();
    }
}
