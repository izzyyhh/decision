import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "@src/common/guards/auth.guard";
import { Poll, PollType } from "@src/polls/entities/poll.entity";
import { ForbiddenError } from "apollo-server-core";

import { DecisionsService } from "./decisions.service";
import { GetDecisionForUserAndPollDto } from "./dto/decision.for.user.and.poll.get";
import { GetDecisionDto } from "./dto/decision.get";
import { DecisionInput } from "./dto/decision.input";
import { GetDecisionForPollDto } from "./dto/decisions.for.poll.get";
import { Decision } from "./entities/decision.entity";

@Resolver(() => Decision)
export class DecisionsResolver {
    constructor(
        private readonly optionsService: DecisionsService,
        @InjectRepository(Decision) private readonly repository: EntityRepository<Decision>,
        @InjectRepository(Poll) private readonly pollRepository: EntityRepository<Poll>,
    ) {}

    @Query(() => [Decision])
    async optionsAll(): Promise<Decision[]> {
        return this.repository.findAll();
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Decision)
    async addDecision(@Args("data", { type: () => DecisionInput }) data: DecisionInput): Promise<Decision | null> {
        const poll = await this.pollRepository.findOne({ id: data.poll });
        if (poll && poll.type === PollType.BINARY) {
            const currentDecision = await this.repository.findOne({ poll: data.poll, user: data.user }, { populate: true });
            if (currentDecision) {
                throw new ForbiddenError("You have already taken a decision");
            }
        }
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

    @UseGuards(AuthGuard)
    @Query(() => Boolean)
    async canDecide(@Args("data", { type: () => GetDecisionForUserAndPollDto }) data: GetDecisionForUserAndPollDto): Promise<boolean> {
        const poll = await this.pollRepository.findOne({ id: data.poll });
        if (poll && poll.type === PollType.BINARY) {
            const decision = await this.repository.findOne({ user: data.user, poll: data.poll }, { populate: true });
            if (decision) {
                return false;
            } else {
                return true;
            }
        }
        return true;
    }
}
