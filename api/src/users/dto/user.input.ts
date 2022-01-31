import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class UserInput {
    @Field()
    @IsString()
    name: string;

    @Field()
    @IsString()
    token: string;
}
