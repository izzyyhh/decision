import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    extensionsToTreatAsEsm: [".tsx", ".ts"],
    globals: {
        "ts-jest": {
            useESM: true,
        },
    },
};
export default config;
