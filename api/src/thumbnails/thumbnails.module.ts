import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { Thumbnail } from "./entities/thumbnail.entity";
import { ThumbnailsResolver } from "./thumbnails.resolver";
import { ThumbnailsService } from "./thumbnails.service";

@Module({
    imports: [MikroOrmModule.forFeature([Thumbnail])],
    providers: [ThumbnailsService, ThumbnailsResolver],
    exports: [ThumbnailsService],
})
export class ThumbnailsModule {}
