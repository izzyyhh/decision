import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class Genre extends BaseEntity<Genre, "apiId"> {
    @Field(() => ID)
    @PrimaryKey({ type: "string" })
    apiId: string;

    @Field()
    @Property({
        columnType: "text",
    })
    title: string;

    // @Field(() => [Movie])
    // @ManyToMany(() => Movie, movie => movie.genres)
    // movies = new Collection<Movie>(this);
}
