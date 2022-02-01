import { EntityRepository, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";

import { Decision } from "./entities/decision.entity";

@Injectable()
export class DecisionsService {
    constructor(@InjectRepository(Decision) private readonly repository: EntityRepository<Decision>) {}

    getFindCondition(query: string | undefined): FilterQuery<Decision> {
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
