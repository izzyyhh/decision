import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { User } from "@src/users/entities/user.entity";

import { DecisionsResolver } from "./decisions.resolver";
import { DecisionsService } from "./decisions.service";
import { Decision } from "./entities/decision.entity";

@Module({
    imports: [MikroOrmModule.forFeature([Decision, User])],
    providers: [DecisionsService, DecisionsResolver],
    exports: [DecisionsService],
})
export class DecisionsModule {}
