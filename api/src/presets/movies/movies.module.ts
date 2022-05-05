import { MikroOrmModule } from "@mikro-orm/nestjs";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { Genre } from "@src/genres/entities/genre.entity";
import { GenresModule } from "@src/genres/genres.module";
import { GenresResolver } from "@src/genres/genres.resolver";
import { GenresService } from "@src/genres/genres.service";

import { Movie } from "./entities/movies.entity";
import { MoviesResolver } from "./movies.resolver";
import { MoviesService } from "./movies.service";

@Module({
    imports: [MikroOrmModule.forFeature([Movie, Genre]), GenresModule, HttpModule],
    providers: [MoviesService, MoviesResolver, GenresResolver, GenresService],
    exports: [MoviesService, MikroOrmModule.forFeature([Movie, Genre]), MoviesResolver],
})
export class MoviesModule {}
