import { EntityRepository, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";

import { Genre } from "./entities/genre.entity";

@Injectable()
export class GenresService {
    constructor(@InjectRepository(Genre) private readonly repository: EntityRepository<Genre>) {}

    getFindCondition(query: string | undefined): FilterQuery<Genre> {
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
