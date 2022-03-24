import { BaseEntity, Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Movie } from "@src/presets/movies/entities/movies.entity";

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

    @Field(() => [Movie])
    @ManyToMany(() => Movie)
    movies = new Collection<Movie>(this);
}
