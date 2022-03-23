import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Query, Resolver } from "@nestjs/graphql";
import { Movie } from "@src/presets/movies/entities/movies.entity";
import * as fs from "fs";

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
    async usersAll(): Promise<Genre[]> {
        return this.repository.findAll();
    }

    @Query(() => Boolean)
    async addMovies() {
        const file = fs.readFileSync(`${process.cwd()}/src/tasks/movies.json`, "utf8");

        const data = JSON.parse(file);

        for (const movie of data.results) {
            const genres = movie.genre_ids;
            const genreArray = await this.addGenres(genres);
            const movieEntity = this.movieRepository.create({
                title: movie.original_title,
                posterPath: movie.poster_path,
                backdropPath: movie.backdrop_path,
                rating: movie.vote_average,
                description: movie.overview,
                releaseDate: movie.release_date,
                adult: movie.adult,
                mediaType: movie.mediaType ?? "",
                genres: genreArray,
            });
            await this.movieRepository.persistAndFlush(movieEntity);
        }

        return true;
    }

    async addGenres(genres: any): Promise<Genre[]> {
        const entities = genres.map((g: any) => this.repository.create({ title: g }));
        await this.repository.persistAndFlush(entities);

        return entities;
    }
}
