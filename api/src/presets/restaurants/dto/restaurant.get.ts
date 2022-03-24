import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class OptionDto {
    @Field()
    @IsString()
    title: string;

    @Field()
    @IsString()
    thumbnailUrl: string;
}
