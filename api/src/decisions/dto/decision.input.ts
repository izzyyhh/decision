import { Field, InputType } from "@nestjs/graphql";
import { Option } from "@src/options/entities/option.entity";
import { Poll } from "@src/polls/entities/poll.entity";
import { User } from "@src/users/entities/user.entity";

@InputType()
export class DecisionInput {
    @Field()
    user: User;

    @Field()
    poll: Poll;

    @Field()
    options: Array<Option>;

    @Field()
    answer?: number;
}
