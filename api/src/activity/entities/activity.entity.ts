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

    @Field({ nullable: true })
    date: number;

    @Field(() => ActivityType)
    @IsEnum(ActivityType)
    type: ActivityType;

    @Field()
    id: string;

    @Field()
    pollId: string;
}

registerEnumType(ActivityType, {
    name: "ActivityType",
});
