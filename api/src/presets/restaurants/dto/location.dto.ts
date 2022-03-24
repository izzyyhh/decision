import { Field, InputType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType()
export class LocationDto {
    @Field()
    @IsNumber()
    latitude: number;

    @Field()
    @IsNumber()
    longitude: number;
}
