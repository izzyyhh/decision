import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsUUID } from "class-validator";

@InputType()
export class OptionInput {
    @Field()
    @IsString()
    title: string;

    @Field()
    @IsUUID()
    poll: string;

    @Field()
    @IsString()
    thumbnailUrl: string;
}
