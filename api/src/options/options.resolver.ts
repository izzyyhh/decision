import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "@src/common/guards/auth.guard";

import { OptionInput } from "./dto/option.input";
import { GetOptionsForPollDto } from "./dto/options.for.poll";
import { Option } from "./entities/option.entity";
import { OptionsService } from "./options.service";

@Resolver(() => Option)
export class OptionsResolver {
    constructor(private readonly optionsService: OptionsService, @InjectRepository(Option) private readonly repository: EntityRepository<Option>) {}

    @UseGuards(AuthGuard)
    @Query(() => [Option])
    async optionsAll(): Promise<Option[]> {
        return this.repository.findAll();
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Option)
    async addOption(@Args("data", { type: () => OptionInput }) data: OptionInput): Promise<Option | null> {
        const entity = this.repository.create(data);
        await this.repository.persistAndFlush(entity);
        const optionEntity = await this.repository.findOne(entity.id, { populate: true });

        return optionEntity;
    }

    @UseGuards(AuthGuard)
    @Query(() => [Option])
    async getOptionsForPoll(@Args("data", { type: () => GetOptionsForPollDto }) data: GetOptionsForPollDto): Promise<Option[]> {
        const entities = await this.repository.find({ poll: data.pollId });

        return entities;
    }
}
