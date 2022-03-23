import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Genre } from "@src/genres/entities/genre.entity";
import { Movie } from "@src/presets/movies/entities/movies.entity";

import { TasksConsole } from "./tasks.console";

@Module({
    providers: [TasksConsole],
    imports: [MikroOrmModule.forFeature([Movie, Genre])],
})
export class TasksModule {}
