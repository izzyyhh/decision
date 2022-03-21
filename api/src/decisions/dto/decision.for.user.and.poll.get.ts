import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class GetDecisionForUserAndPollDto {
    @Field()
    @IsUUID()
    user: string;

    @Field()
    @IsUUID()
    poll: string;
}
