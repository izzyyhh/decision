// /test/customer.e2e-spec.ts

import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "@src/app.module";
import request from "supertest";

describe("PollsResolver - e2e", () => {
    const graphqlEndpoint = "/graphql";
    let app: INestApplication;
    let currentUser: { id: string; token: string; refreshToken: string; name: string };
    let query: string;
    let createPollData: { title: string; type: string; owner: string };

    beforeEach(async () => {
        const appModule: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        const appRef = appModule.createNestApplication();
        app = await appRef.init();

        const userResponse = await request(app.getHttpServer())
            .post(graphqlEndpoint)
            .send({ query: 'mutation{addUser(data: {name: "izzy"}){id,token,refreshToken, name}}' });

        currentUser = userResponse.body.data.addUser;
        createPollData = { title: "Beer or Wine?", type: "BINARY", owner: currentUser.id };
    });

    afterAll(async () => {
        await app.close();
    });

    describe("[Mutation] addPoll", () => {
        beforeEach(() => {
            query = `mutation{addPoll(data:{title:"${createPollData.title}", type:${createPollData.type}, owner: "${createPollData.owner}"}){id, title, owner{id}, type}}`;
        });
        it("should not create a new poll if unauthorized", async () => {
            const { body } = await request(app.getHttpServer()).post(graphqlEndpoint).send({
                query,
            });

            expect(body.errors).toBeTruthy();
            expect(body.errors.some((e: { message: string }) => e.message === "Forbidden resource")).toBeTruthy();
            expect(body.data?.addPoll).toBeFalsy();
        });

        it("should create a new poll authorized", async () => {
            const { body } = await request(app.getHttpServer()).post(graphqlEndpoint).set("Authorization", `Bearer ${currentUser.token}`).send({
                query,
            });

            expect(body.data.addPoll).toEqual(
                expect.objectContaining({ title: createPollData.title, type: createPollData.type, owner: { id: createPollData.owner } }),
            );
        });

        // it("should not create a new poll if wrong Bearer token given");

        // it("should get a single customer by id", () => {
        //     let customer;
        //     return request(app.getHttpServer())
        //         .post(graphqlEndpoint)
        //         .send({
        //             query: 'mutation {createCustomer(name: "John Doe", email: "john.doe@example.com", phone: "145677312965", address: "123 Road, Springfied, MO") {address name id phone email}}',
        //         })
        //         .expect(200)
        //         .expect((res) => {
        //             customer = res.body.data.createCustomer;
        //         })
        //         .then(() =>
        //             request(app.getHttpServer())
        //                 .post(gql)
        //                 .send({
        //                     query: `{customer(id: "${customer.id}") {address name id phone email}}`,
        //                 })
        //                 .expect(200)
        //                 .expect((res) => {
        //                     expect(res.body.data.customer).toEqual({
        //                         id: customer.id,
        //                         address: customer.address,
        //                         name: customer.name,
        //                         phone: customer.phone,
        //                         email: customer.email,
        //                     });
        //                 }),
        //         );
        // });

        // it("should retrieve all customer data", async () => {
        //     const data = [
        //         {
        //             name: "John Doe",
        //             email: "john.doe@example.com",
        //             phone: "145677312965",
        //             address: "123 Road, Springfied, MO",
        //         },
        //         {
        //             name: "Jane Doe",
        //             email: "jane.doe@example.com",
        //             phone: "145677312900",
        //             address: "456 Road, Springfied, MO",
        //         },
        //     ];
        //     const connection = await getConnection();
        //     data.map(async (item) => {
        //         await connection.createQueryBuilder().insert().into(CustomerModel).values(item).execute();
        //     });

        //     request(app.getHttpServer())
        //         .post(gql)
        //         .send({
        //             query: `{customers() {address name phone email}}`,
        //         })
        //         .expect(200)
        //         .expect((res) => {
        //             expect(res.body.data.customers.length).toEqual(data.length);
        //             expect(res.body.data.customers[0]).toEqual(data[0]);
        //         });
        // });
    });
});
