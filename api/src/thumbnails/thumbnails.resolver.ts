import { EntityRepository } from "@mikro-orm/core";
import { Query, Resolver } from "@nestjs/graphql";

import { Thumbnail } from "./entities/thumbnail.entity";
import { ThumbnailsService } from "./thumbnails.service";

@Resolver(() => Thumbnail)
export class ThumbnailsResolver {
    repository: EntityRepository<Thumbnail>;

    constructor(private readonly thumbnailsService: ThumbnailsService) {}

    @Query(() => [Thumbnail])
    async thumbnailsAll(): Promise<Thumbnail[]> {
        return this.repository.findAll();
    }
}
