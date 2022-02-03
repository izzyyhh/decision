import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "@src/common/guards/auth.guard";

import { DecisionsService } from "./decisions.service";
import { GetDecisionDto } from "./dto/decision.get";
import { DecisionInput } from "./dto/decision.input";
import { GetDecisionForPollDto } from "./dto/decisions.for.poll.get";
import { Decision } from "./entities/decision.entity";

@Resolver(() => Decision)
export class DecisionsResolver {
    constructor(
        private readonly optionsService: DecisionsService,
        @InjectRepository(Decision) private readonly repository: EntityRepository<Decision>,
    ) {}

    @Query(() => [Decision])
    async optionsAll(): Promise<Decision[]> {
        return this.repository.findAll();
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Decision)
    async addDecision(@Args("data", { type: () => DecisionInput }) data: DecisionInput): Promise<Decision | null> {
        const entity = this.repository.create(data);
        await this.repository.persistAndFlush(entity);
        const decision = await this.repository.findOneOrFail(entity.id, { populate: true });

        return decision;
    }

    @UseGuards(AuthGuard)
    @Query(() => Decision)
    async getDecision(@Args("data", { type: () => GetDecisionDto }) data: GetDecisionDto): Promise<Decision | null> {
        return await this.repository.findOneOrFail(data.id, { populate: true });
    }

    @UseGuards(AuthGuard)
    @Query(() => [Decision])
    async getDecisionsForPoll(@Args("data", { type: () => GetDecisionForPollDto }) data: GetDecisionForPollDto): Promise<Decision[] | null> {
        return await this.repository.find({ poll: data.pollId }, { populate: true });
    }
}
