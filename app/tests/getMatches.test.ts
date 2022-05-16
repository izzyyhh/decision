import IDecision from "../src/types/IDecision";
import { getMatches } from "../src/utils/getMatches";

describe("test getMatches function", () => {
    it("should return totaltmatches of 0 if no decions are made", () => {
        const decisions: Array<IDecision> = [];
        const { totalMatches } = getMatches(decisions);
        expect(totalMatches).toBe(0);
    });

    it("should return totalmatches of 0 if only one user has made a decision", () => {
        const decisions: Array<IDecision> = [
            {
                option: {
                    id: "10ed4de1-3542-4559-86c4-b2e6ef07f6e1",
                    title: "The Contractor",
                },
                user: {
                    id: "09d9dd11-2333-47b6-97c8-30bf6424767c",
                    name: "",
                },
            },
            {
                option: {
                    id: "ecf87263-c7a5-4d63-98fc-a1e94c36d8cf",
                    title: "Spider-Man: No Way Home",
                },
                user: {
                    id: "09d9dd11-2333-47b6-97c8-30bf6424767c",
                    name: "",
                },
            },
            {
                option: {
                    id: "879c507c-c3f0-4877-9e5f-20afc982bae9",
                    title: "The Bad Guys",
                },
                user: {
                    id: "09d9dd11-2333-47b6-97c8-30bf6424767c",
                    name: "",
                },
            },
            {
                option: {
                    id: "a5942e28-8e45-4b0d-b418-30a73f363853",
                    title: "Doctor Strange in the Multiverse of Madness",
                },
                user: {
                    id: "09d9dd11-2333-47b6-97c8-30bf6424767c",
                    name: "",
                },
            },
            {
                option: {
                    id: "a2b4ebe4-a3f5-4733-88b2-0d290d2cd790",
                    title: "Uncharted",
                },
                user: {
                    id: "09d9dd11-2333-47b6-97c8-30bf6424767c",
                    name: "",
                },
            },
        ];
        const { totalMatches } = getMatches(decisions);
        expect(totalMatches).toBe(0);
    });

    it("should return totalmatches of 0 if multiple mulitple users have no match", () => {
        const decisions = [
            {
                option: {
                    id: "d0676905-5847-4020-9718-070196d10d79",
                    title: "The Bad Guys",
                },
                user: {
                    id: "92d6af62-e993-4b7a-9923-4d7137bdaa1c",
                    name: "",
                },
            },
            {
                option: {
                    id: "8821e185-3aa1-4f44-a5e2-5ae588d3829d",
                    title: "Doctor Strange in the Multiverse of Madness",
                },
                user: {
                    id: "92d6af62-e993-4b7a-9923-4d7137bdaa1c",
                    name: "",
                },
            },
            {
                option: {
                    id: "e14741c1-7865-40d7-87dd-1695a8d3ada4",
                    title: "Sonic the Hedgehog 2",
                },
                user: {
                    id: "92d6af62-e993-4b7a-9923-4d7137bdaa1c",
                    name: "",
                },
            },
            {
                option: {
                    id: "dfe19cc5-4936-4b1f-b381-7f53a143a78c",
                    title: "Spider-Man: No Way Home",
                },
                user: {
                    id: "09d9dd11-2333-47b6-97c8-30bf6424767c",
                    name: "",
                },
            },
        ];
        const { totalMatches } = getMatches(decisions);
        expect(totalMatches).toBe(0);
    });

    it("should return coorect amount of matches for two users", () => {
        const decisions = [
            {
                option: {
                    id: "48829ecc-3e3e-454a-9c3d-ef99cb1106b7",
                    title: "Uncharted",
                },
                user: {
                    id: "09d9dd11-2333-47b6-97c8-30bf6424767c",
                    name: "",
                },
            },
            {
                option: {
                    __typename: "Option",
                    id: "9fb589b9-65c9-46cf-8660-037737a95eee",
                    title: "Doctor Strange in the Multiverse of Madness",
                },
                user: {
                    id: "09d9dd11-2333-47b6-97c8-30bf6424767c",
                    name: "",
                },
            },
            {
                option: {
                    id: "70d4126d-d910-434e-b8da-94213e9a9fc4",
                    title: "The Bad Guys",
                },
                user: {
                    id: "92d6af62-e993-4b7a-9923-4d7137bdaa1c",
                    name: "",
                },
            },
            {
                option: {
                    id: "48829ecc-3e3e-454a-9c3d-ef99cb1106b7",
                    title: "Uncharted",
                },
                user: {
                    id: "92d6af62-e993-4b7a-9923-4d7137bdaa1c",
                    name: "",
                },
            },
            {
                option: {
                    id: "9fb589b9-65c9-46cf-8660-037737a95eee",
                    title: "Doctor Strange in the Multiverse of Madness",
                },
                user: {
                    id: "92d6af62-e993-4b7a-9923-4d7137bdaa1c",
                    name: "",
                },
            },
            {
                option: {
                    id: "b2056ae6-7ba3-4a73-9ae2-647b78e00e3b",
                    title: "Sonic the Hedgehog 2",
                },
                user: {
                    id: "92d6af62-e993-4b7a-9923-4d7137bdaa1c",
                    name: "",
                },
            },
        ];
        const { totalMatches } = getMatches(decisions);
        expect(totalMatches).toBe(2);
    });

    it("should return coorect amount of matches for more than two users", () => {
        const decisions = [
            {
                option: {
                    id: "48829ecc-3e3e-454a-9c3d-ef99cb1106b7",
                    title: "Uncharted",
                },
                user: {
                    id: "09d9dd11-2333-47b6-97c8-30bf6424767c",
                    name: "",
                },
            },
            {
                option: {
                    id: "9fb589b9-65c9-46cf-8660-037737a95eee",
                    title: "Doctor Strange in the Multiverse of Madness",
                },
                user: {
                    id: "09d9dd11-2333-47b6-97c8-30bf6424767c",
                    name: "",
                },
            },
            {
                option: {
                    id: "70d4126d-d910-434e-b8da-94213e9a9fc4",
                    title: "The Bad Guys",
                },
                user: {
                    id: "92d6af62-e993-4b7a-9923-4d7137bdaa1c",
                    name: "",
                },
            },
            {
                option: {
                    id: "48829ecc-3e3e-454a-9c3d-ef99cb1106b7",
                    title: "Uncharted",
                },
                user: {
                    id: "92d6af62-e993-4b7a-9923-4d7137bdaa1c",
                    name: "",
                },
            },
            {
                option: {
                    id: "9fb589b9-65c9-46cf-8660-037737a95eee",
                    title: "Doctor Strange in the Multiverse of Madness",
                },
                user: {
                    id: "92d6af62-e993-4b7a-9923-4d7137bdaa1c",
                    name: "",
                },
            },
            {
                option: {
                    id: "b2056ae6-7ba3-4a73-9ae2-647b78e00e3b",
                    title: "Sonic the Hedgehog 2",
                },
                user: {
                    id: "92d6af62-e993-4b7a-9923-4d7137bdaa1c",
                    name: "",
                },
            },
            {
                option: {
                    id: "48829ecc-3e3e-454a-9c3d-ef99cb1106b7",
                    title: "Uncharted",
                },
                user: {
                    id: "e895b2bf-c7ad-4d10-813b-3d9ad4dfccba",
                    name: "",
                },
            },
        ];
        const { totalMatches } = getMatches(decisions);
        expect(totalMatches).toBe(1);
    });

    it("should return the correct option as match", () => {
        const decisions = [
            {
                option: {
                    id: "48829ecc-3e3e-454a-9c3d-ef99cb1106b7",
                    title: "Uncharted",
                },
                user: {
                    id: "09d9dd11-2333-47b6-97c8-30bf6424767c",
                    name: "",
                },
            },
            {
                option: {
                    id: "9fb589b9-65c9-46cf-8660-037737a95eee",
                    title: "Doctor Strange in the Multiverse of Madness",
                },
                user: {
                    id: "09d9dd11-2333-47b6-97c8-30bf6424767c",
                    name: "",
                },
            },
            {
                option: {
                    id: "70d4126d-d910-434e-b8da-94213e9a9fc4",
                    title: "The Bad Guys",
                },
                user: {
                    id: "92d6af62-e993-4b7a-9923-4d7137bdaa1c",
                    name: "",
                },
            },
            {
                option: {
                    id: "48829ecc-3e3e-454a-9c3d-ef99cb1106b7",
                    title: "Uncharted",
                },
                user: {
                    id: "92d6af62-e993-4b7a-9923-4d7137bdaa1c",
                    name: "",
                },
            },
            {
                option: {
                    id: "9fb589b9-65c9-46cf-8660-037737a95eee",
                    title: "Doctor Strange in the Multiverse of Madness",
                },
                user: {
                    id: "92d6af62-e993-4b7a-9923-4d7137bdaa1c",
                    name: "",
                },
            },
            {
                option: {
                    id: "b2056ae6-7ba3-4a73-9ae2-647b78e00e3b",
                    title: "Sonic the Hedgehog 2",
                },
                user: {
                    id: "92d6af62-e993-4b7a-9923-4d7137bdaa1c",
                    name: "",
                },
            },
            {
                option: {
                    id: "48829ecc-3e3e-454a-9c3d-ef99cb1106b7",
                    title: "Uncharted",
                },
                user: {
                    id: "e895b2bf-c7ad-4d10-813b-3d9ad4dfccba",
                    name: "",
                },
            },
        ];
        const { userOptions } = getMatches(decisions);
        expect(userOptions["Uncharted"].isMatch).toBe(true);
    });
});
