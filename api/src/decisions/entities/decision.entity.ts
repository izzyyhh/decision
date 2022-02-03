import { BaseEntity, Entity, Index, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
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

    @Field(() => User)
    @ManyToOne(() => User)
    @Index()
    user: User;

    @Field(() => Option)
    @ManyToOne(() => Option)
    @Index()
    option: Option;

    @Field(() => Poll)
    @ManyToOne(() => Poll)
    @Index()
    poll: Poll;

    @Field({ nullable: true })
    @Property({
        nullable: true,
    })
    answer?: number;
}
