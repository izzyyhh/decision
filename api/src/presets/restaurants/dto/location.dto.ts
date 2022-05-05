import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";

@InputType()
export class LocationDto {
    @Field()
    @IsNumber()
    latitude: number;

    @Field()
    @IsNumber()
    longitude: number;
}

@InputType()
export class CityDto {
    @Field()
    @IsString()
    name: string;

    @Field()
    @IsNumber()
    amount: number;
}
