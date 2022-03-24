import { Field, InputType } from "@nestjs/graphql";
import { Genre } from "@src/genres/entities/genre.entity";

@InputType()
export class MoviesGetByGenre {
    @Field()
    genre: Genre["apiId"];
}
