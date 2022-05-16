import { EntityRepository, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import QRCode from "qrcode";

import { GetPollDto } from "./dto/poll.get";
import { PollInput } from "./dto/poll.input";
import { QrCodeDto } from "./dto/poll.qrCode";
import { QRCodeResponse } from "./dto/qrcode.response";
import { Poll } from "./entities/poll.entity";

@Injectable()
export class PollsService {
    constructor(@InjectRepository(Poll) private readonly repository: EntityRepository<Poll>) {}

    getFindCondition(query: string | undefined): FilterQuery<Poll> {
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

    findAll() {
        return this.repository.findAll();
    }

    async create(data: PollInput) {
        const entity = this.repository.create(data);
        await this.repository.persistAndFlush(entity);

        return entity;
    }

    createQrCode(data: QrCodeDto) {
        const sharelink: QRCodeResponse = {
            id: QRCode.toDataURL(data.shareLink),
        };

        return sharelink;
    }

    findPoll(data: GetPollDto) {
        return this.repository.findOneOrFail(data.pollId, { populate: true });
    }
}
