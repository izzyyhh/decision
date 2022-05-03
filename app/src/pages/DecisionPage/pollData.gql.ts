import { gql } from "@apollo/client";

const getPoll = gql`
    query getPoll($data: GetPollDto!) {
        getPoll(data: $data) {
            id
            type
            title
            sharelink
        }
    }
`;

const getQRCode = gql`
    query getQRCode($data: QrCodeDto!) {
        getQRCode(data: $data) {
            id
        }
    }
`;

const getOptions = gql`
    query getOptionsForPoll($data: GetOptionsForPollDto!) {
        getOptionsForPoll(data: $data) {
            id
            title
            thumbnailUrl
        }
    }
`;

const addDecision = gql`
    mutation addDecision($data: DecisionInput!) {
        addDecision(data: $data) {
            id
            user {
                id
            }
            option {
                id
            }
        }
    }
`;

export { getPoll as getPoll, getOptions as getOptions, addDecision as addDecision, getQRCode as getQRCode };
