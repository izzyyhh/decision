import { Options } from "@mikro-orm/core";
import ormConfig from "@src/db/ormconfig";

const config: Options = {
    ...ormConfig,
    entities: ["./dist/**/*.entity.js"],
    entitiesTs: ["./src/**/*.entity.ts"],
};

export = config;
