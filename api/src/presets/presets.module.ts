import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { User } from "@src/users/entities/user.entity";

import { PresetsResolver } from "./presets.resolver";
import { PresetsService } from "./presets.service";

@Module({
    imports: [MikroOrmModule.forFeature([User])],
    providers: [PresetsService, PresetsResolver],
    exports: [PresetsService],
})
export class PresetsModule {}
