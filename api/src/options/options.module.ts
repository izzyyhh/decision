import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { User } from "@src/users/entities/user.entity";

import { Option } from "./entities/option.entity";
import { OptionsResolver } from "./options.resolver";
import { OptionsService } from "./options.service";

@Module({
    imports: [MikroOrmModule.forFeature([Option, User])],
    providers: [OptionsService, OptionsResolver],
    exports: [OptionsService],
})
export class OptionsModule {}
