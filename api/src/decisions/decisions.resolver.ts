import { EntityRepository } from "@mikro-orm/postgresql";
import { Query, Resolver } from "@nestjs/graphql";

import { DecisionsService } from "./decisions.service";
import { Decision } from "./entities/decision.entity";

@Resolver(() => Decision)
export class DecisionsResolver {
    repository: EntityRepository<Decision>;

    constructor(private readonly optionsService: DecisionsService) {}

    @Query(() => [Decision])
    async optionsAll(): Promise<Decision[]> {
        return this.repository.findAll();
    }
}
