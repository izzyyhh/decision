import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class GetOptionsForPollDto {
    @Field()
    @IsUUID()
    pollId: string;
}
