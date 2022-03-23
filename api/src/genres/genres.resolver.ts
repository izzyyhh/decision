import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Query, Resolver } from "@nestjs/graphql";

import { Genre } from "./entities/genre.entity";
import { GenresService } from "./genres.service";

@Resolver(() => Genre)
export class GenresResolver {
    constructor(private readonly genresService: GenresService, @InjectRepository(Genre) private readonly repository: EntityRepository<Genre>) {}

    @Query(() => [Genre])
    async usersAll(): Promise<Genre[]> {
        return this.repository.findAll();
    }
}
