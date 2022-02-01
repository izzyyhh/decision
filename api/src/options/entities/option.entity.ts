import { BaseEntity, Entity, Index, ManyToOne, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Decision } from "@src/decisions/entities/decision.entity";
import { Poll } from "@src/polls/entities/poll.entity";
import { Thumbnail } from "@src/thumbnails/entities/thumbnail.entity";
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

    @ManyToOne(() => Poll)
    @Index()
    poll: Poll;

    @OneToOne(() => Thumbnail)
    @Index()
    thumbnail: Thumbnail;

    @ManyToOne(() => Decision)
    @Index()
    decision: Decision;
}
