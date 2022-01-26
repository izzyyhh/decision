import { Type } from "@nestjs/common";
import { Field, Int, ObjectType } from "@nestjs/graphql";

export interface PaginatedType<Nodes> {
    nodes: Nodes[];
    totalCount: number;
    nextPage?: number;
    previousPage?: number;
    totalPages?: number;
}

export interface PaginatedConstructor<Nodes> extends Function {
    new (nodes: Nodes[], totalCount: number, args: { page: number; size: number }): PaginatedType<Nodes>;
}

export class PaginatedResponseFactory {
    static create<Nodes>(classRef: Type<Nodes>): PaginatedConstructor<Nodes> {
        @ObjectType()
        class PaginatedClass implements PaginatedType<Nodes> {
            @Field(() => [classRef])
            nodes: Nodes[];

            @Field(() => Int)
            totalCount: number;

            @Field(() => Int, { nullable: true })
            nextPage?: number;

            @Field(() => Int, { nullable: true })
            previousPage?: number;

            @Field(() => Int, { nullable: true })
            totalPages?: number;

            constructor(nodes: Nodes[], totalCount: number, args: { page: number; size: number }) {
                const { page, size } = args;

                this.nodes = nodes;
                this.totalCount = totalCount;
                this.nextPage = totalCount > page * size ? page + 1 : undefined;
                this.previousPage = page > 1 ? page - 1 : undefined;
                this.totalPages = Math.ceil(totalCount / size);
            }
        }

        return PaginatedClass;
    }
}
