import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsEnum } from "class-validator";

export enum ActivityType {
    POLL,
    DECISION,
}

@ObjectType()
export class Activity {
    @Field()
    name: string;

    @Field()
    date: number;

    @Field(() => ActivityType)
    @IsEnum(ActivityType)
    type: ActivityType;

    @Field()
    id: string;
}

registerEnumType(ActivityType, {
    name: "ActivityType",
});
