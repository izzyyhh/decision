import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Poll } from "@src/polls/entities/poll.entity";
import { User } from "@src/users/entities/user.entity";

import { DecisionsResolver } from "./decisions.resolver";
import { DecisionsService } from "./decisions.service";
import { Decision } from "./entities/decision.entity";

@Module({
    imports: [MikroOrmModule.forFeature([Decision, User, Poll])],
    providers: [DecisionsService, DecisionsResolver],
    exports: [DecisionsService],
})
export class DecisionsModule {}
