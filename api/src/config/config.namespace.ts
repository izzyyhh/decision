/* eslint-disable @typescript-eslint/naming-convention */
import { registerAs } from "@nestjs/config";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class EnvironmentVariables {
    @IsString()
    POSTGRESQL_HOST: string;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === "true")
    POSTGRESQL_USE_SSL: boolean;

    @Type(() => Number)
    @IsInt()
    POSTGRESQL_PORT: number;

    @IsString()
    POSTGRESQL_DB: string;

    @IsOptional()
    @IsString()
    POSTGRESQL_USER?: string;

    @IsString()
    POSTGRESQL_PWD: string;

    @IsString()
    API_URL: string;

    @Type(() => Number)
    @IsInt()
    API_PORT: number;

    // @IsString()
    // IDP_CLIENT_ID: string;

    // @IsString()
    // IDP_API_URL: string;

    // @IsString()
    // IDP_API_PASSWORD: string;

    @IsString()
    CORS_ALLOWED_ORIGINS: string;
}

export const configNS = registerAs("config", () => ({
    ...(process.env as unknown as EnvironmentVariables),
    debug: process.env.NODE_ENV !== "production",
}));
