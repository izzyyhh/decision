import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { GenresModule } from "@src/genres/genres.module";

import { Movie } from "./entities/movies.entity";
import { MoviesResolver } from "./movies.resolver";
import { MoviesService } from "./movies.service";

@Module({
    imports: [MikroOrmModule.forFeature([Movie]), GenresModule],
    providers: [MoviesService, MoviesResolver],
    exports: [MoviesService, MikroOrmModule.forFeature([Movie]), MoviesResolver],
})
export class MoviesModule {}
