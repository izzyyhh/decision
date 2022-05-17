import { getRepositoryToken, MikroOrmModule } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "@src/app.module";
import request from "supertest";

import { Poll } from "./entities/poll.entity";
import { PollsService } from "./polls.service";

describe("PollsResolver - e2e", () => {
    const graphqlEndpoint = "/graphql";
    let app: INestApplication;
    let currentUser: { id: string; token: string; refreshToken: string; name: string };
    let query: string;
    let createPollData: { title: string; type: string; owner: string };
    let repository: EntityRepository<Poll>;
    let service: PollsService;

    beforeEach(async () => {
        const appModule: TestingModule = await Test.createTestingModule({
            imports: [AppModule, MikroOrmModule.forFeature([Poll])],
        }).compile();

        const appRef = appModule.createNestApplication();
        app = await appRef.init();

        const userResponse = await request(app.getHttpServer())
            .post(graphqlEndpoint)
            .send({ query: 'mutation{addUser(data: {name: "izzy"}){id,token,refreshToken, name}}' });

        currentUser = userResponse.body.data.addUser;
        createPollData = { title: "Beer or Wine?", type: "BINARY", owner: currentUser.id };
        repository = await app.get(getRepositoryToken(Poll));
        service = appRef.get<PollsService>(PollsService);
    });

    afterAll(async () => {
        await app.close();
    });

    describe("[Mutation] addPoll", () => {
        beforeEach(() => {
            query = `mutation{addPoll(data:{title:"${createPollData.title}", type:${createPollData.type}, owner: "${createPollData.owner}"}){id, title, owner{id}, type}}`;
        });

        describe("unauthorized", () => {
            it("should not create a new poll", async () => {
                const { body } = await request(app.getHttpServer()).post(graphqlEndpoint).send({
                    query,
                });

                expect(body.errors).toBeTruthy();
                expect(body.errors.some((e: { message: string }) => e.message === "Forbidden resource")).toBeTruthy();
                expect(body.data?.addPoll).toBeFalsy();
            });
        });

        describe("authorized with Bearer token", () => {
            it("should be able to create a new poll", async () => {
                const { body } = await request(app.getHttpServer()).post(graphqlEndpoint).set("Authorization", `Bearer ${currentUser.token}`).send({
                    query,
                });

                expect(body.data.addPoll).toEqual(
                    expect.objectContaining({ title: createPollData.title, type: createPollData.type, owner: { id: createPollData.owner } }),
                );
            });
            it("persists created poll in the database with correct data", async () => {
                const serviceSpy = jest.spyOn(service, "create");
                const repoSpy = jest.spyOn(repository, "create");

                const { body } = await request(app.getHttpServer()).post(graphqlEndpoint).set("Authorization", `Bearer ${currentUser.token}`).send({
                    query,
                });

                const databaseEntity = await repository.findOne(body.data.addPoll.id);

                expect(serviceSpy).toHaveBeenCalled();
                expect(repoSpy).toHaveBeenCalled();
                expect(databaseEntity).not.toBe(null);
                expect(databaseEntity?.title).toEqual(createPollData.title);
                expect(databaseEntity?.owner?.id).toEqual(createPollData.owner);
            });
        });
    });

    describe("[Query] getPoll", () => {
        let createMutation: string;
        let pollId: string;

        beforeEach(async () => {
            createMutation = `mutation{addPoll(data:{title:"${createPollData.title}", type:${createPollData.type}, owner: "${createPollData.owner}"}){id, title, owner{id}, type}}`;
            const { body } = await request(app.getHttpServer()).post(graphqlEndpoint).set("Authorization", `Bearer ${currentUser.token}`).send({
                query: createMutation,
            });

            pollId = body.data.addPoll.id;
            query = `query{getPoll(data:{pollId: "${pollId}"}){id, title, type, owner{id}}}`;
        });

        describe("unauthorized", () => {
            it("should not get poll", async () => {
                const { body } = await request(app.getHttpServer()).post(graphqlEndpoint).send({
                    query,
                });

                expect(body.errors).toBeTruthy();
                expect(body.errors.some((e: { message: string }) => e.message === "Forbidden resource")).toBeTruthy();
                expect(body.data?.getPoll).toBeFalsy();
            });
        });
        describe("authorized", () => {
            it("should get right poll from database", async () => {
                const serviceSpy = jest.spyOn(service, "findPoll");
                const repoSpy = jest.spyOn(repository, "findOneOrFail");
                const { body } = await request(app.getHttpServer()).post(graphqlEndpoint).set("Authorization", `Bearer ${currentUser.token}`).send({
                    query,
                });

                expect(serviceSpy).toHaveBeenCalled();
                expect(repoSpy).toHaveBeenCalled();
                expect(body.data?.getPoll).not.toBeFalsy();
                expect(body.data?.getPoll?.id).toEqual(pollId);
            });
        });
    });
});
