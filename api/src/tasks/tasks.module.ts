import { Module } from "@nestjs/common";
import { GenresModule } from "@src/genres/genres.module";
import { MoviesModule } from "@src/presets/movies/movies.module";

import { TasksService } from "./tasks.service";

@Module({
    providers: [TasksService],
    imports: [MoviesModule, GenresModule],
})
export class TasksModule {}
