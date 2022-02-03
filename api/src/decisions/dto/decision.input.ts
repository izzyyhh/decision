import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsUUID } from "class-validator";

@InputType()
export class DecisionInput {
    @Field()
    @IsUUID()
    user: string;

    @Field()
    @IsUUID()
    poll: string;

    @Field()
    @IsUUID()
    option: string;

    @Field({ nullable: true })
    @IsOptional()
    answer?: number;
}
