import { ArgsType, Field } from "@nestjs/graphql";
import { SortDirection } from "@src/common/enums";
import { IsEnum, IsOptional, IsString, ValidateIf } from "class-validator";

@ArgsType()
export class SortArgs {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    sortColumnName?: string;

    @Field(() => SortDirection, { nullable: true })
    @ValidateIf(({ columnName }) => columnName)
    @IsEnum(SortDirection)
    sortDirection?: SortDirection;
}
