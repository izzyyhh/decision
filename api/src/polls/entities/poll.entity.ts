import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
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

    /*
    @Field()
    @ManyToOne({
        columnType: ""
        
    })
    owner: User

    @Field()
    @Property({
        columnType: "?"
    })
    type: EnumArrayType
    */
}
