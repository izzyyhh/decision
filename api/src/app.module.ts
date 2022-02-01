import { Module } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@src/config/config.module";
import { configNS } from "@src/config/config.namespace";
import { DbModule } from "@src/db/db.module";
import { ProductsModule } from "@src/products/products.module";
import admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin/app";

import serviceAccount from "../firebase-config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DecisionsModule } from "./decisions/decisions.module";
import { OptionsModule } from "./options/options.module";
import { PollsModule } from "./polls/polls.module";
import { ThumbnailsModule } from "./thumbnails/thumbnails.module";
import { UsersModule } from "./users/users.module";

export const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
});
@Module({
    imports: [
        ConfigModule,
        DbModule,
        GraphQLModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigType<typeof configNS>) => ({
                debug: true, //config.debug,
                playground: true, //config.debug,
                autoSchemaFile: "schema.gql",
                context: ({ req }) => ({ ...req }),
                cors: {
                    credentials: true,
                    origin: config.CORS_ALLOWED_ORIGINS.split(",").map((val: string) => new RegExp(val)),
                },
                // See https://docs.nestjs.com/graphql/other-features#execute-enhancers-at-the-field-resolver-level
                fieldResolverEnhancers: ["guards", "interceptors", "filters"],
            }),
            inject: [configNS.KEY],
        }),
        ProductsModule,
        PollsModule,
        UsersModule,
        ThumbnailsModule,
        OptionsModule,
        DecisionsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
