import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class PollInput {
    @Field()
    @IsString()
    title: string;

    @Field()
    @IsString()
    sharelink: string;
}
