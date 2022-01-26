import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { v4 } from "uuid";

@ObjectType()
@Entity()
export class Product extends BaseEntity<Product, "id"> {
    @Field(() => ID)
    @PrimaryKey({ type: "uuid" })
    id: string = v4();

    @Field()
    @Property({
        columnType: "text",
    })
    name: string;

    @Field()
    @Property({
        columnType: "text",
    })
    description: string;

    @Field()
    @Property({
        columnType: "timestamp with time zone",
    })
    createdAt: Date = new Date();

    @Field({ nullable: true })
    @Property({
        columnType: "timestamp with time zone",
        onUpdate: () => new Date(),
    })
    updatedAt: Date = new Date();
}
