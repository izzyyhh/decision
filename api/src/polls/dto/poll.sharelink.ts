import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class PollShareLinkDto {
    @Field()
    @IsString()
    pollId: string;
}
