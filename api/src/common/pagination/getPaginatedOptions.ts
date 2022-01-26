import { QueryOrderMap } from "@mikro-orm/core/enums";

import { PaginationArgs } from "./dto/pagination.args";
import { SortArgs } from "./dto/sort.args";

export function getPaginationOptions({ size, page }: PaginationArgs): { skip: number; take: number } {
    const skip = size * (page - 1);
    const take = size;

    return {
        skip,
        take,
    };
}
export function getSortAndPaginationOptions({
    sortColumnName,
    sortDirection,
    ...args
}: PaginationArgs & SortArgs): { order: QueryOrderMap } & ReturnType<typeof getPaginationOptions> {
    const { skip, take } = getPaginationOptions(args);
    let order = {};

    if (sortColumnName && sortDirection) {
        order = { [sortColumnName]: sortDirection };
    }

    return {
        skip,
        take,
        order,
    };
}
