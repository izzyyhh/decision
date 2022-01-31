import { BaseEntity, Entity, Enum, Index, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "@src/users/entities/user.entity";
import { v4 } from "uuid";

@ObjectType()
@Entity()
export class Poll extends BaseEntity<Poll, "id"> {
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
    sharelink: string;

    @ManyToOne(() => User)
    @Index()
    owner: User;

    @Enum()
    type: Type;

    @Field()
    @Property()
    prefifined: boolean;
}

export const enum Type {
    BINARY,
    DATE,
    NUMERICAL,
    TINDER,
}
