import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
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
    rating: number;
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

    // @Field(() => [Genre])
    // @ManyToMany(() => Genre)
    // genres = new Collection<Genre>(this);

    @Field()
    @Property({
        columnType: "text",
    })
    genres: string;
}
