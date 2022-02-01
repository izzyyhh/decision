import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class ThumbnailInput {
    @Field()
    @IsString()
    link: string;
}
