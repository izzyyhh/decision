import { FilterQuery } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ActivityService {
    getFindCondition(query: string | undefined): FilterQuery<ActivityService> {
        if (query) {
            return {
                $or: [
                    {
                        name: {
                            $ilike: `%${query}%`,
                        },
                        description: {
                            $ilike: `%${query}%`,
                        },
                    },
                ],
            };
        }

        return {};
    }
}
