import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { Poll } from "./entities/poll.entity";
import { PollsResolver } from "./polls.resolver";
import { PollsService } from "./polls.service";

@Module({
    imports: [MikroOrmModule.forFeature([Poll])],
    providers: [PollsService, PollsResolver],
    exports: [PollsService],
})
export class PollsModule {}
