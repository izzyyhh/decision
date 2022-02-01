import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { DecisionsResolver } from "./decisions.resolver";
import { DecisionsService } from "./decisions.service";
import { Decision } from "./entities/decision.entity";

@Module({
    imports: [MikroOrmModule.forFeature([Decision])],
    providers: [DecisionsService, DecisionsResolver],
    exports: [DecisionsService],
})
export class DecisionsModule {}
