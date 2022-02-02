import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";

import { PollType } from "../entities/poll.entity";

@InputType()
export class PollInput {
    @Field()
    @IsString()
    title: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    predefined?: boolean;

    @Field()
    @IsUUID()
    owner: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field((type) => PollType)
    @IsEnum(PollType)
    type: PollType;
}
