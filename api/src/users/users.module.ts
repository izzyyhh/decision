import { MikroOrmModule } from "@mikro-orm/nestjs";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { User } from "./entities/user.entity";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
    imports: [MikroOrmModule.forFeature([User]), HttpModule],
    providers: [UsersService, UsersResolver],
    exports: [UsersService],
})
export class UsersModule {}
