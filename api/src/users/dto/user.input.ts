import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class UserInput {
    @Field()
    @IsString()
    name: string;

    @Field()
    @IsString()
    @IsOptional()
    token?: string;
}
