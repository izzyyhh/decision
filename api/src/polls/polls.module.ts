import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { User } from "@src/users/entities/user.entity";

import { Poll } from "./entities/poll.entity";
import { PollsResolver } from "./polls.resolver";
import { PollsService } from "./polls.service";

@Module({
    imports: [MikroOrmModule.forFeature([Poll, User])],
    providers: [PollsService, PollsResolver],
    exports: [PollsService],
})
export class PollsModule {}
