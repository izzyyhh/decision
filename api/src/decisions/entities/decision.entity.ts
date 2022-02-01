import { BaseEntity, Entity, Index, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
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

    @Field()
    @Property({
        nullable: true,
    })
    answer?: number;
}
