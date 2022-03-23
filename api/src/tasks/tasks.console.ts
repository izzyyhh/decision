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
        @Inject(MoviesResolver) private readonly movieResolver: MoviesResolver,
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
        console.log("test2");
        await movies.forEach(async (m: Movie) => {
            await this.movieRepository.remove(m).flush();
        });
        // const genres = await this.genreRepository.findAll();
        // await genres.forEach(async (g: Genre) => {
        //     await this.genreRepository.removeAndFlush(g);
        // });
        this.logger.debug("Called once after 5 seconds");
        await this.movieResolver.addMovies(1);
        /*
        setTimeout(async () => {
            await this.movieResolver.addMovies(2);
        }, 1500); */
    }
}
