import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";

@ObjectType()
export class Activity {
    @Field()
    name: string;

    @Field()
    date: number;

    @Field()
    type: ActivityType;

    @Field()
    id: string;
}

export enum ActivityType {
    POLL,
    DECISION,
}

registerEnumType(ActivityType, {
    name: "ActivityType",
});
