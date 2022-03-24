import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Inject } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { Genre } from "@src/genres/entities/genre.entity";
import { GenresResolver } from "@src/genres/genres.resolver";
import * as https from "https";

import { MoviesDto } from "./dto/movies.get";
import { Movie } from "./entities/movies.entity";
import { MoviesService } from "./movies.service";

@Resolver(() => Movie)
export class MoviesResolver {
    constructor(
        private readonly moviesService: MoviesService,
        @InjectRepository(Movie) private readonly repository: EntityRepository<Movie>,
        @Inject(GenresResolver) private readonly genreResolver: GenresResolver,
    ) {}

    // @Query(() => [Movie])
    // async moviesAll(): Promise<Movie[]> {
    //     return this.repository.findAll();
    // }

    @Query(() => [MoviesDto])
    async getMoviesPreset(): Promise<MoviesDto[]> {
        const movies = await this.repository.findAll();
        const maped: MoviesDto[] = movies.map((m: Movie): MoviesDto => {
            return {
                title: m.title,
                thumbnailUrl: m.posterPath,
            };
        });
        return maped;
    }

    // @Query(() => [Movie])
    // async getMoviesByGenre(@Args("data", { type: () => MoviesGetByGenre }) data: MoviesGetByGenre): Promise<Movie[] | null> {
    //     const movies = await this.repository.find({ genres: data.genre }, { populate: true });
    //     return movies;
    // }

    @Query(() => Boolean)
    async addMovies(page: number) {
        const options = {
            hostname: "api.themoviedb.org",
            port: 443,
            path: `/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=${page}`,
            method: "GET",
        };

        const req = https.request(options, async (res) => {
            console.log(`statusCode: ${res.statusCode}`);

            const data: Buffer[] = [];
            await res
                .on("data", (d: Buffer) => {
                    data.push(d);
                })
                .on("end", async () => {
                    const buffer = Buffer.concat(data);
                    const d = JSON.parse(buffer.toString("utf8"));
                    try {
                        for (const movie of d.results) {
                            const genres = movie.genre_ids;
                            const genreArray: Genre[] = [];
                            await genres.forEach(async (genre: string) => {
                                const g = await this.genreResolver.getGenre(genre.toString());
                                genreArray.push(g);
                            });
                            const movieEntity = this.repository.create({
                                title: movie.title,
                                posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                                backdropPath: movie.backdrop_path,
                                rating: movie.vote_average,
                                description: movie.overview,
                                releaseDate: movie.release_date,
                                adult: movie.adult,
                                mediaType: movie.mediaType ?? "",
                                genres: genreArray,
                            });
                            await this.repository.persistAndFlush(movieEntity);
                            if (page < 5) {
                                console.log("insert");
                                this.addMovies(page + 1);
                            }
                        }
                    } catch (e) {
                        console.log("error");
                    }
                });
        });

        req.on("error", (error: Error) => {
            console.error(error);
            return false;
        });

        req.end();
        return true;
    }
}
