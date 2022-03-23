import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Query, Resolver } from "@nestjs/graphql";

import { Movie } from "./entities/movies.entity";
import { MoviesService } from "./movies.service";

@Resolver(() => Movie)
export class MoviesResolver {
    constructor(private readonly moviesService: MoviesService, @InjectRepository(Movie) private readonly repository: EntityRepository<Movie>) {}

    @Query(() => [Movie])
    async usersAll(): Promise<Movie[]> {
        return this.repository.findAll();
    }
}
