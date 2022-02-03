import { BaseEntity, Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Poll } from "@src/polls/entities/poll.entity";
import { v4 } from "uuid";

@ObjectType()
@Entity()
export class Option extends BaseEntity<Option, "id"> {
    @Field(() => ID)
    @PrimaryKey({ type: "uuid" })
    id: string = v4();

    @Field()
    @Property({
        columnType: "text",
    })
    title: string;

    @Field(() => Poll)
    @ManyToOne(() => Poll)
    poll: Poll;

    @Field({ nullable: true })
    @Property({
        nullable: true,
    })
    thumbnailUrl?: string;
}
