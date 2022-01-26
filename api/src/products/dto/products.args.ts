import { ArgsType, Field, IntersectionType } from "@nestjs/graphql";
import { OffsetBasedPaginationArgs } from "@src/common/pagination/dto/offset-based.args";
import { PaginationArgs } from "@src/common/pagination/dto/pagination.args";
import { SortArgs } from "@src/common/pagination/dto/sort.args";
import { IsOptional, IsString } from "class-validator";

@ArgsType()
export class ProductsArgs extends IntersectionType(PaginationArgs, SortArgs) {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    query?: string;
}

@ArgsType()
export class ProductsOffsetBasedArgs extends IntersectionType(OffsetBasedPaginationArgs, SortArgs) {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    query?: string;
}
