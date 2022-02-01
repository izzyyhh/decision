import { Field, InputType } from "@nestjs/graphql";
import { Poll } from "@src/polls/entities/poll.entity";
import { Thumbnail } from "@src/thumbnails/entities/thumbnail.entity";
import { IsString } from "class-validator";

@InputType()
export class OptionInput {
    @Field()
    @IsString()
    title: string;

    @Field()
    poll: Poll;

    @Field()
    thumbnail: Thumbnail;
}
