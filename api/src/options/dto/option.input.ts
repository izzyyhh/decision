import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString, IsUUID } from "class-validator";

@InputType()
export class OptionInput {
    @Field()
    @IsString()
    title: string;

    @Field()
    @IsUUID()
    poll: string;

    @Field()
    @IsOptional()
    thumbnailUrl: string;
}
