import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { FixturesModule } from "@src/db/fixtures/fixtures.module";
import ormConfig from "@src/db/ormconfig";

import { MigrateConsole } from "./migrate.console";

@Module({
    imports: [
        MikroOrmModule.forRoot({
            ...ormConfig,
            autoLoadEntities: true,
        }),
        FixturesModule,
    ],
    providers: [MigrateConsole],
})
export class DbModule {}
