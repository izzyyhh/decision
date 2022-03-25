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

const getOptions = gql`
    query getOptionsForPoll($data: GetOptionsForPollDto!) {
        getOptionsForPoll(data: $data) {
            id
            title
            thumbnailUrl
        }
    }
`;

const ADD_DECISION = gql`
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

export { getPoll as getPoll, getOptions as getOptions, ADD_DECISION as ADD_DECISION };
