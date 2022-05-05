import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";

@InputType()
export class GetMoviePresetDto {
    @Field()
    @IsString()
    categories: string;

    @Field()
    @IsNumber()
    size: number;
}
