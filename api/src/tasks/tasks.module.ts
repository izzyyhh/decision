import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Genre } from "@src/genres/entities/genre.entity";
import { GenresModule } from "@src/genres/genres.module";
import { Movie } from "@src/presets/movies/entities/movies.entity";
import { MoviesModule } from "@src/presets/movies/movies.module";

import { TasksConsole } from "./tasks.console";

@Module({
    providers: [TasksConsole],
    imports: [MikroOrmModule.forFeature([Movie, Genre]), GenresModule, MoviesModule],
})
export class TasksModule {}
