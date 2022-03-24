import { Field, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@ObjectType()
export class Preset {
    @Field()
    @IsString()
    title: string;

    @Field()
    @IsString()
    thumbnailUrl: string;
}
