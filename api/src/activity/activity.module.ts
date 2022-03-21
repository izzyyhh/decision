import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Decision } from "@src/decisions/entities/decision.entity";
import { Poll } from "@src/polls/entities/poll.entity";
import { User } from "@src/users/entities/user.entity";

import { ActivityResolver } from "./activity.resolver";
import { ActivityService } from "./activity.service";

@Module({
    imports: [MikroOrmModule.forFeature([User, Decision, Poll])],
    providers: [ActivityService, ActivityResolver],
    exports: [ActivityService],
})
export class ActivityModule {}
