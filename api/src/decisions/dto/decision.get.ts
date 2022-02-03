import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class GetDecisionDto {
    @Field()
    @IsUUID()
    id: string;
}
