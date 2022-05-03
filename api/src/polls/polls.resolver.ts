import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "@src/common/guards/auth.guard";
import QRCode from "qrcode";

import { GetPollDto } from "./dto/poll.get";
import { PollInput } from "./dto/poll.input";
import { QrCodeDto } from "./dto/poll.qrCode";
import { PollShareLinkDto } from "./dto/poll.sharelink";
import { Poll } from "./entities/poll.entity";
import { PollsService } from "./polls.service";

interface QRCodeResponse {
    id: Promise<string>;
}

@Resolver(() => Poll)
export class PollsResolver {
    constructor(private readonly pollsService: PollsService, @InjectRepository(Poll) private readonly repository: EntityRepository<Poll>) {}

    @UseGuards(AuthGuard)
    @Query(() => [Poll])
    async pollsAll(): Promise<Poll[]> {
        return this.repository.findAll();
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Poll)
    async addPoll(@Args("data", { type: () => PollInput }) data: PollInput): Promise<Poll> {
        const entity = this.repository.create(data);
        await this.repository.persistAndFlush(entity);

        return entity;
    }

    @UseGuards(AuthGuard)
    async createShareLink(@Args("data", { type: () => PollShareLinkDto }) data: PollShareLinkDto): Promise<Poll> {
        const entity = await this.repository.findOneOrFail(data.pollId);

        // TODO: hash assign and return

        return entity;
    }

    @UseGuards(AuthGuard)
    @Query(() => Poll)
    async getQRCode(@Args("data", { type: () => QrCodeDto }) data: QrCodeDto): Promise<QRCodeResponse> {
        const sharelink: QRCodeResponse = {
            id: QRCode.toDataURL(data.shareLink),
        };

        return sharelink;
    }

    @UseGuards(AuthGuard)
    @Query(() => Poll)
    async getPoll(@Args("data", { type: () => GetPollDto }) data: GetPollDto): Promise<Poll> {
        return this.repository.findOneOrFail(data.pollId, { populate: true });
    }
}
