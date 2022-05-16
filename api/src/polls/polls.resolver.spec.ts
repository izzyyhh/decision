import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "@src/app.module";

import { GetPollDto } from "./dto/poll.get";
import { PollInput } from "./dto/poll.input";
import { QrCodeDto } from "./dto/poll.qrCode";
import { Poll, PollType } from "./entities/poll.entity";
import { PollsModule } from "./polls.module";
import { PollsResolver } from "./polls.resolver";
import { PollsService } from "./polls.service";

describe("PollsResolver", () => {
    let resolver: PollsResolver;
    // mock object which is used to create mocks with jest.fn() on any functions of the poll service
    // therefore type of any
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const pollServiceMock: any = {};
    /* eslint-enable  @typescript-eslint/no-explicit-any */

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule, PollsModule],
            providers: [PollsService, PollsResolver],
        })
            .overrideProvider(PollsService)
            .useValue(pollServiceMock)
            .compile();

        resolver = module.get<PollsResolver>(PollsResolver);
    });

    it("should be defined", () => {
        expect(resolver).toBeDefined();
    });

    describe("create", () => {
        let createResult: Partial<Poll> | { owner: string };
        const createDto: PollInput = {
            title: "Beer or Wine?",
            owner: "12345678",
            type: PollType.BINARY,
        };

        pollServiceMock.create = jest.fn(() => Promise.resolve(createResult));

        it("calls service.create only once", () => {
            resolver.addPoll(createDto);
            expect(pollServiceMock.create).toHaveBeenCalledTimes(1);
        });
        it("calls service.create with correct arguments", () => {
            resolver.addPoll(createDto);
            expect(pollServiceMock.create).toHaveBeenCalledWith(createDto);
        });
        it("should create a poll when create mutation is invoked", async () => {
            createResult = {
                id: "12345678",
                title: createDto.title,
                type: createDto.type,
                owner: createDto.owner,
            };

            resolver.addPoll(createDto);
            expect(await resolver.addPoll(createDto)).toEqual(createResult);
        });
    });

    describe("pollsAll", () => {
        let findAllResult: Partial<Poll>[];
        pollServiceMock.findAll = jest.fn(() => Promise.resolve(findAllResult));

        it("should call service.findAll once", () => {
            resolver.pollsAll();
            expect(pollServiceMock.findAll).toHaveBeenCalledTimes(1);
        });
        it("should findAll polls", async () => {
            findAllResult = [{ title: "Beer or Wine?" }, { title: "Left or Right?" }, { title: "Water or Coffe?" }];
            expect(await resolver.pollsAll()).toEqual(findAllResult);
        });
    });

    describe("getQrCode", () => {
        const qrCodeResult = "qrcodebase64string";
        const qrCodeInput: QrCodeDto = { shareLink: "https://izzy.sharelink.izzy" };
        pollServiceMock.createQrCode = jest.fn(() => qrCodeResult);

        it("should call service.createQrCode once", () => {
            resolver.getQRCode(qrCodeInput);
            expect(pollServiceMock.createQrCode).toHaveBeenCalledTimes(1);
        });
        it("should get QR Code", async () => {
            expect(await resolver.getQRCode(qrCodeInput)).toEqual(qrCodeResult);
            expect(pollServiceMock.createQrCode).toBeCalledWith(qrCodeInput);
        });
    });

    describe("getPoll", () => {
        const polls: { [key: string]: { [key: string]: string } } = {
            a: { title: "Beer or Wine?" },
            b: { title: "Left or Right?" },
            c: { title: "Water or Coffe?" },
        };

        pollServiceMock.findPoll = jest.fn((data: GetPollDto) => Promise.resolve(polls[data.pollId]));

        it("should call service.findPoll once", () => {
            resolver.getPoll({ pollId: "abcdefg" });
            expect(pollServiceMock.findPoll).toHaveBeenCalledTimes(1);
        });

        it("should return the poll with the given id", async () => {
            expect(await resolver.getPoll({ pollId: "a" })).toEqual(polls["a"]);
            expect(await resolver.getPoll({ pollId: "b" })).toEqual(polls["b"]);
            expect(await resolver.getPoll({ pollId: "c" })).toEqual(polls["c"]);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
