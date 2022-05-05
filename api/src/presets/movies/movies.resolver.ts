import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { HttpService } from "@nestjs/axios";
import { Inject } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { Genre } from "@src/genres/entities/genre.entity";
import { GenresResolver } from "@src/genres/genres.resolver";

import { MoviesDto } from "./dto/movies.get";
import { GetMoviePresetDto } from "./dto/movies.preset.get";
import { Movie } from "./entities/movies.entity";
import { MoviesService } from "./movies.service";

@Resolver(() => Movie)
export class MoviesResolver {
    constructor(
        private readonly moviesService: MoviesService,
        private httpService: HttpService,
        @InjectRepository(Movie) private readonly repository: EntityRepository<Movie>,
        @Inject(GenresResolver) private readonly genreResolver: GenresResolver,
        @InjectRepository(Genre) private readonly genreRepository: EntityRepository<Genre>,
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

    //     @Query(() => [MoviesDto])
    //     async getMoviesPresetWithSettings(size: number, genres:string[]): Promise<MoviesDto[]> {
    //         const movies = await this.repository.findAll();
    //         console.log(movies)

    //         return []
    //    }

    // @Query(() => Boolean)
    // async addMovies(page: number) {
    //     const options = {
    //         hostname: "api.themoviedb.org",
    //         port: 443,
    //         path: `/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=${page}`,
    //         method: "GET",
    //     };

    //     const req = https.request(options, async (res) => {
    //         console.log(`statusCode: ${res.statusCode}`);

    //         const data: Buffer[] = [];
    //         await res
    //             .on("data", (d: Buffer) => {
    //                 data.push(d);
    //             })
    //             .on("end", async () => {
    //                 const buffer = Buffer.concat(data);
    //                 const d = JSON.parse(buffer.toString("utf8"));
    //                 try {
    //                     for (const movie of d.results) {
    //                         const genres = movie.genre_ids;
    //                         const genreArray: Genre[] = [];
    //                         await genres.forEach(async (genre: string) => {
    //                             const g = await this.genreResolver.getGenre(genre.toString());
    //                             genreArray.push(g);
    //                         });
    //                         const movieEntity = this.repository.create({
    //                             title: movie.title,
    //                             posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    //                             backdropPath: movie.backdrop_path,
    //                             rating: movie.vote_average,
    //                             description: movie.overview,
    //                             releaseDate: movie.release_date ?? "",
    //                             adult: movie.adult ?? "",
    //                             mediaType: movie.mediaType ?? "",
    //                             genres: genreArray,
    //                         });
    //                         await this.repository.persistAndFlush(movieEntity);
    //                         if (page < 5) {
    //                             console.log("insert");
    //                             this.addMovies(page + 1);
    //                         }
    //                     }
    //                 } catch (e) {
    //                     console.log(e);
    //                 }
    //             });
    //     });

    //     req.on("error", (error: Error) => {
    //         console.error(error);
    //         return false;
    //     });

    //     req.end();
    //     return true;
    // }

    @Query(() => [Movie])
    async fetchMoviePreset(@Args("data", { type: () => GetMoviePresetDto }) data: GetMoviePresetDto) {
        const categories = data.categories.split(",");
        const size = data.size <= 50 ? data.size : 50;

        //one page has 20 items
        const PAGES = 10;
        const requestConfig = {
            hostname: "api.themoviedb.org",
            port: 443,
            path: `/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=`,
            method: "GET",
        };
        const movieReponses = [];

        try {
            for (let page = 1; page <= PAGES; page++) {
                const url = `https://${requestConfig.hostname + requestConfig.path + page}`;
                const response = await this.httpService.axiosRef.get(url);
                movieReponses.push(response.data.results);
            }

            const movieEntitiesPromises = movieReponses.flat().map(async (m) => {
                const genrePromises = m.genre_ids.map((gid: number) => {
                    return this.genreResolver.getGenre(gid.toString());
                });
                const genreEntities = await Promise.all(genrePromises);
                const genreTitles = genreEntities.map((g) => g.title).join(",");

                return this.repository.create({
                    title: m.title ?? "",
                    posterPath: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
                    backdropPath: `https://image.tmdb.org/t/p/w500${m.backdrop_path}`,
                    rating: m.vote_average?.toString() ?? "",
                    description: m.overview ?? "",
                    releaseDate: m.release_date ?? "",
                    adult: m.adult,
                    mediaType: m.mediaType ?? "",
                    genres: genreTitles,
                });
            });

            const movieEntities = await Promise.all(movieEntitiesPromises);

            if (categories.length != 0) {
                const filteredMovies = movieEntities.filter((m) => categories.some((c) => m.genres.includes(c)));
                if (filteredMovies.length >= size) {
                    return filteredMovies.slice(0, size);
                } else {
                    for (let count = filteredMovies.length; count <= size; count++) {
                        let inserted = false;

                        while (!inserted) {
                            const random = Math.floor(Math.random() * movieEntities.length);
                            if (!filteredMovies.find((m) => m.title == movieEntities[random].title)) {
                                filteredMovies.push(movieEntities[random]);
                                inserted = true;
                            }
                        }
                        count++;
                    }

                    return filteredMovies;
                }
            }
            return movieEntities.splice(0, size);
        } catch (e) {
            console.error(e);
        }
    }
}
