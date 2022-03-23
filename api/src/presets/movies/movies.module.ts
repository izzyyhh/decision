import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { Movie } from "./entities/movies.entity";
import { MoviesResolver } from "./movies.resolver";
import { MoviesService } from "./movies.service";

@Module({
    imports: [MikroOrmModule.forFeature([Movie])],
    providers: [MoviesService, MoviesResolver],
    exports: [MoviesService, MikroOrmModule.forFeature([Movie])],
})
export class MoviesModule {}
