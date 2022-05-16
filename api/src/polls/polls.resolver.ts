import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "@src/common/guards/auth.guard";

import { GetPollDto } from "./dto/poll.get";
import { PollInput } from "./dto/poll.input";
import { QrCodeDto } from "./dto/poll.qrCode";
import { QRCodeResponse } from "./dto/qrcode.response";
import { Poll } from "./entities/poll.entity";
import { PollsService } from "./polls.service";

@Resolver(() => Poll)
export class PollsResolver {
    constructor(private readonly pollsService: PollsService) {}

    @UseGuards(AuthGuard)
    @Query(() => [Poll])
    async pollsAll(): Promise<Poll[]> {
        return this.pollsService.findAll();
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Poll)
    async addPoll(@Args("data", { type: () => PollInput }) data: PollInput): Promise<Poll> {
        return await this.pollsService.create(data);
    }

    @UseGuards(AuthGuard)
    @Query(() => Poll)
    async getQRCode(@Args("data", { type: () => QrCodeDto }) data: QrCodeDto): Promise<QRCodeResponse> {
        return this.pollsService.createQrCode(data);
    }

    @UseGuards(AuthGuard)
    @Query(() => Poll)
    async getPoll(@Args("data", { type: () => GetPollDto }) data: GetPollDto): Promise<Poll> {
        return this.pollsService.findPoll(data);
    }
}
