import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Movie } from "@src/presets/movies/entities/movies.entity";

import { Genre } from "./entities/genre.entity";
import { GenresResolver } from "./genres.resolver";
import { GenresService } from "./genres.service";

@Module({
    imports: [MikroOrmModule.forFeature([Genre, Movie])],
    providers: [GenresService, GenresResolver],
    exports: [GenresService, GenresResolver],
})
export class GenresModule {}
