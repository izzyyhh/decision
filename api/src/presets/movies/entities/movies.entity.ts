import { BaseEntity, Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Genre } from "@src/genres/entities/genre.entity";
import { v4 } from "uuid";

@ObjectType()
@Entity()
export class Movie extends BaseEntity<Movie, "id"> {
    @Field(() => ID)
    @PrimaryKey({ type: "uuid" })
    id: string = v4();

    @Field()
    @Property({
        columnType: "text",
    })
    title: string;

    @Field()
    @Property({
        columnType: "text",
    })
    posterPath: string;

    @Field()
    @Property({
        columnType: "text",
        nullable: true,
    })
    backdropPath?: string;

    @Field()
    @Property({
        columnType: "text",
    })
    rating: string;

    @Field()
    @Property({
        columnType: "text",
    })
    description: string;

    @Field()
    @Property({
        columnType: "text",
    })
    releaseDate: string;

    @Field()
    @Property({
        columnType: "text",
        nullable: true,
    })
    adult: boolean;

    @Field()
    @Property({
        columnType: "text",
    })
    mediaType: string;

    @Field(() => [Genre])
    @ManyToMany(() => Genre, (genre) => genre.movies)
    genres = new Collection<Genre>(this);
}
