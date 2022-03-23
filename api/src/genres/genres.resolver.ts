import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Query, Resolver } from "@nestjs/graphql";
import { Movie } from "@src/presets/movies/entities/movies.entity";

import { Genre } from "./entities/genre.entity";
import { GenresService } from "./genres.service";
@Resolver(() => Genre)
export class GenresResolver {
    constructor(
        private readonly genresService: GenresService,
        @InjectRepository(Genre) private readonly repository: EntityRepository<Genre>,
        @InjectRepository(Movie) private readonly movieRepository: EntityRepository<Movie>,
    ) {}

    @Query(() => [Genre])
    async moviesAll(): Promise<Genre[]> {
        return this.repository.findAll();
    }

    async addGenres(genres: any): Promise<Genre[]> {
        const entities = genres.map((g: any) => this.repository.create({ title: g }));
        await this.repository.persistAndFlush(entities);

        return entities;
    }
}
