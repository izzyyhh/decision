import { EntityRepository } from "@mikro-orm/postgresql";
import { Query, Resolver } from "@nestjs/graphql";

import { Option } from "./entities/option.entity";
import { OptionsService } from "./options.service";

@Resolver(() => Option)
export class OptionsResolver {
    repository: EntityRepository<Option>;

    constructor(private readonly optionsService: OptionsService) {}

    @Query(() => [Option])
    async optionsAll(): Promise<Option[]> {
        return this.repository.findAll();
    }
}
