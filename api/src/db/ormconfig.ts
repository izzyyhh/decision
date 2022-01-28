import { Options } from "@mikro-orm/core";

const ormConfig: Options = {
    type: "postgresql",
    clientUrl: process.env.DATABASE_URL,
    // host: process.env.POSTGRESQL_HOST,
    // port: Number(process.env.POSTGRESQL_PORT),
    // user: process.env.POSTGRESQL_USER,
    // password: Buffer.from(process.env.POSTGRESQL_PWD ?? "", "base64")
    //     .toString("utf-8")
    //     .trim(),
    // dbName: process.env.POSTGRESQL_DB,
    driverOptions: {
        connection: { ssl: process.env.POSTGRESQL_USE_SSL === "true" },
    },

    debug: process.env.NODE_ENV !== "production",
    migrations: {
        pattern: /^[\w-]+\d+\.[jt]s$/,
        path: process.env.NODE_ENV !== "production" ? "./src/db/migrations" : "./dist/db/migrations",
        disableForeignKeys: false,
    },
};

export = ormConfig;
