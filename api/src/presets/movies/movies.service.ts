import { EntityRepository, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";

import { Movie } from "./entities/movies.entity";

@Injectable()
export class MoviesService {
    constructor(@InjectRepository(Movie) private readonly repository: EntityRepository<Movie>) {}

    getFindCondition(query: string | undefined): FilterQuery<Movie> {
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
