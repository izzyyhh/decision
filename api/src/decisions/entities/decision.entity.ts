import { BaseEntity, Collection, Entity, Index, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Option } from "@src/options/entities/option.entity";
import { Poll } from "@src/polls/entities/poll.entity";
import { User } from "@src/users/entities/user.entity";
import { v4 } from "uuid";

@ObjectType()
@Entity()
export class Decision extends BaseEntity<Decision, "id"> {
    @Field(() => ID)
    @PrimaryKey({ type: "uuid" })
    id: string = v4();

    @ManyToOne(() => User)
    @Index()
    user: User;

    @ManyToOne(() => Poll)
    @Index()
    poll: Poll;

    @OneToMany({ entity: () => Option, mappedBy: "decision", orphanRemoval: true })
    options = new Collection<Option>(this);

    @Field()
    @Property({
        nullable: true,
    })
    answer?: number;
}