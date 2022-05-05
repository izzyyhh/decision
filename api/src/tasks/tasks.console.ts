import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron, Timeout } from "@nestjs/schedule";
import { Genre } from "@src/genres/entities/genre.entity";
import { GenresResolver } from "@src/genres/genres.resolver";
import { Movie } from "@src/presets/movies/entities/movies.entity";
import { MoviesResolver } from "@src/presets/movies/movies.resolver";

@Injectable()
export class TasksConsole {
    constructor(
        @InjectRepository(Movie) private readonly movieRepository: EntityRepository<Movie>,
        @Inject(MoviesResolver) private readonly movieResolver: MoviesResolver,
        @Inject(GenresResolver) private readonly genreResolver: GenresResolver,
        @InjectRepository(Genre) private readonly genreRepository: EntityRepository<Genre>,
    ) {}
    private readonly logger = new Logger(TasksConsole.name);

    @Cron("00 03 * * * *")
    async handleCron() {
        const movies = await this.movieRepository.findAll();
        console.log("test8");
        await movies.forEach(async (m: Movie) => {
            await this.movieRepository.removeAndFlush(m);
        });
        await this.movieResolver.addMovies(1);
    }

    @Timeout(1000)
    async handleGenres() {
        const genres = await this.genreRepository.findAll();
        await genres.forEach(async (g: Genre) => {
            await this.genreRepository.removeAndFlush(g);
        });
        await this.genreResolver.addGenres();
        this.logger.debug("Called once after 5 seconds");
    }

    @Timeout(10000)
    async handleMovies() {
        const movies = await this.movieRepository.findAll();
        console.log("test9");
        await movies.forEach(async (m: Movie) => {
            await this.movieRepository.removeAndFlush(m);
        });
        await this.movieResolver.addMovies(1);
    }
}
