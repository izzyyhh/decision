import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class MoviesGetByGenre {
    @Field()
    @IsUUID()
    genre: string;
}
