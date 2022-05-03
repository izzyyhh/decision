import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class QrCodeDto {
    @Field()
    @IsString()
    shareLink: string;
}
