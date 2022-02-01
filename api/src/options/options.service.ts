import { EntityRepository, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";

import { Option } from "./entities/option.entity";

@Injectable()
export class OptionsService {
    constructor(@InjectRepository(Option) private readonly repository: EntityRepository<Option>) {}

    getFindCondition(query: string | undefined): FilterQuery<Option> {
        if (query) {
            return {
                $or: [
                    {
                        name: {
                            $ilike: `%${query}%`,
                        },
                        description: {
                            $ilike: `%${query}%`,
                        },
                    },
                ],
            };
        }

        return {};
    }
}
