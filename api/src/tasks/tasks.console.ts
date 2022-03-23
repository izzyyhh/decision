import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron, Timeout } from "@nestjs/schedule";
import { Genre } from "@src/genres/entities/genre.entity";
import { Movie } from "@src/presets/movies/entities/movies.entity";
import { MoviesResolver } from "@src/presets/movies/movies.resolver";

@Injectable()
export class TasksConsole {
    constructor(
        @InjectRepository(Movie) private readonly movieRepository: EntityRepository<Movie>,
        @Inject(MoviesResolver) private readonly movieResolver: any,
        @InjectRepository(Genre) private readonly genreRepository: EntityRepository<Genre>,
    ) {}
    private readonly logger = new Logger(TasksConsole.name);

    @Cron("45 * * * * *")
    handleCron() {
        this.logger.debug("Called when the current second is 45");
    }

    @Timeout(1000)
    async handleTimeout() {
        const movies = await this.movieRepository.findAll();
        await movies.forEach(async (m: Movie) => {
            await this.movieRepository.removeAndFlush(m);
        });
        console.log("hello");
        this.logger.debug("Called once after 5 seconds");
        const test = await this.movieResolver.addMovies(2);
        console.log(test);
        /*let https;
        try {
            https = require("https");
        } catch (err) {
            console.log("https support is disabled!");
        }
        const options = {
            hostname: "api.themoviedb.org",
            port: 443,
            path: "/3/trending/movie/week?api_key=629104fb8a747dfc93283962140d699b",
            method: "GET",
        };

        const req = https.request(options, (res: any) => {
            console.log(`statusCode: ${res.statusCode}`);

            res.on("data", (d: any) => {
                process.stdout.write(d);
            });
        });

        req.on("error", (error: any) => {
            console.error(error);
        });

        req.end();*/

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        //const fs = require("fs");

        // fs.readFile(`${process.cwd()}/src/tasks/movies.json`, "utf8", (err: any, data: any) => {
        //     if (err) {
        //         console.error(err);
        //         return;
        //     }
        //     data = JSON.parse(data);

        //     data.results.forEach(async (movie: any) => {
        //         console.log(movie.original_title);
        //         const genres = movie.genre_ids;
        //         const genreArray = this.addGenres(genres);
        //         const movieEntity = this.movieRepository.create({
        //             title: movie.original_title,
        //             posterPath: movie.poster_path,
        //             backdropPath: movie.backdrop_path,
        //             rating: movie.vote_average,
        //             description: movie.overview,
        //             releaseDate: movie.release_date,
        //             adult: movie.adult,
        //             mediaType: movie.mediaType,
        //             genres: genreArray,
        //         });
        //         console.log(movieEntity);
        //         await this.movieRepository.persistAndFlush(movieEntity);
        //     });
        // });
    }

    async addGenres(genres: any): Promise<Genre[]> {
        const entities = genres.map((g: any) => this.genreRepository.create({ title: g }));
        await this.genreRepository.persistAndFlush(entities);
        return entities;
    }
}
