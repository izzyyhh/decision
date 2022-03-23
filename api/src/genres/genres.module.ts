import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { Genre } from "./entities/genre.entity";
import { GenresResolver } from "./genres.resolver";
import { GenresService } from "./genres.service";

@Module({
    imports: [MikroOrmModule.forFeature([Genre])],
    providers: [GenresService, GenresResolver],
    exports: [GenresService, MikroOrmModule.forFeature([Genre])],
})
export class GenresModule {}
