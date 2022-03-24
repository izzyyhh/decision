import { BaseEntity, Entity, Enum, Index, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
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

    @Field({ nullable: true })
    @Property({
        columnType: "text",
        nullable: true,
    })
    sharelink?: string;

    @Field(() => User)
    @ManyToOne(() => User)
    @Index()
    owner: User;

    @Enum()
    @Field(() => PollType)
    type: PollType;

    @Field()
    @Property({
        default: false,
    })
    predefined: boolean;

    @Property({
        nullable: true,
    })
    hash?: string;
}

export enum PollType {
    BINARY,
    DATE,
    NUMERICAL,
    TINDER,
}

registerEnumType(PollType, {
    name: "PollType",
});
