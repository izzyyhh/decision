import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class GetDecisionForPollDto {
    @Field()
    @IsUUID()
    pollId: string;
}
