import { EntityRepository, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";

import { Thumbnail } from "./entities/thumbnail.entity";

@Injectable()
export class ThumbnailsService {
    constructor(@InjectRepository(Thumbnail) private readonly repository: EntityRepository<Thumbnail>) {}

    getFindCondition(query: string | undefined): FilterQuery<Thumbnail> {
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
