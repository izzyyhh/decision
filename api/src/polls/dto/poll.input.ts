import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsString } from "class-validator";

@InputType()
export class PollInput {
    @Field()
    @IsString()
    title: string;

    @Field()
    @IsString()
    sharelink: string;

    @Field()
    @IsBoolean()
    predefined: boolean;
}
