import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { Decision } from "@src/decisions/entities/decision.entity";
import { Poll } from "@src/polls/entities/poll.entity";

import { ActivityInput } from "./dto/activity.input";
import { Activity, ActivityType } from "./entities/activity.entity";

@Resolver(() => Activity)
export class ActivityResolver {
    constructor(
        @InjectRepository(Poll) private readonly pollrepository: EntityRepository<Poll>,
        @InjectRepository(Decision) private readonly decisionrepository: EntityRepository<Decision>,
    ) {}

    //@UseGuards(AuthGuard)
    @Query(() => [Activity])
    async getActivity(@Args("data", { type: () => ActivityInput }) data: ActivityInput): Promise<Activity[]> {
        // const entities = await this.repository.find({ poll: data.pollId });
        const pollPromise: Promise<Activity[]> = new Promise((resolve) => {
            this.pollrepository.find({ owner: data.id }).then((data) => {
                const activities = data.map((poll: Poll): Activity => {
                    return {
                        name: poll.title,
                        date: poll.createdAt ?? Date.now(),
                        type: ActivityType.POLL,
                        id: poll.id,
                    };
                });
                resolve(activities);
            });
        });

        const optionsPromise: Promise<Activity[]> = new Promise((resolve) => {
            this.decisionrepository.find({ user: data.id }, { populate: true }).then((data) => {
                const decisiondata = data.map((decision: Decision): Activity => {
                    return {
                        date: decision.createdAt ?? Date.now(),
                        name: decision.option.title,
                        type: ActivityType.DECISION,
                        id: decision.poll.id,
                    };
                });
                resolve(decisiondata);
            });
        });
        return await Promise.all([pollPromise, optionsPromise]).then((values: Activity[][]): Activity[] => {
            const group: Activity[] = [];
            values.forEach((v: Activity[]) => {
                v.forEach((a: Activity) => group.push(a));
            });
            return group.sort((a: Activity, b: Activity): number => {
                return a.date - b.date;
            });
        });
    }
}
