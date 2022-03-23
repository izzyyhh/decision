import { BaseEntity, Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Movie } from "@src/presets/movies/entities/movies.entity";
import { v4 } from "uuid";

@ObjectType()
@Entity()
export class Genre extends BaseEntity<Genre, "id"> {
    @Field(() => ID)
    @PrimaryKey({ type: "uuid" })
    id: string = v4();

    @Field()
    @Property({
        columnType: "text",
    })
    apiId: string;

    @Field()
    @Property({
        columnType: "text",
    })
    title: string;

    @Field(() => [Movie])
    @ManyToMany(() => Movie)
    movies = new Collection<Movie>(this);
}
