import { gql } from "@apollo/client";

export const OptionsForPollQuery = gql`
    query getOptionsForPoll($data: GetOptionsForPollDto!) {
        getOptionsForPoll(data: $data) {
            id
            title
        }
    }
`;

export const PollQuery = gql`
    query getPoll($data: GetPollDto!) {
        getPoll(data: $data) {
            title
        }
    }
`;

export const DecisionsPollQuery = gql`
    query getDecisionsForPoll($data: GetDecisionForPollDto!) {
        getDecisionsForPoll(data: $data) {
            option {
                id
                title
            }
            user {
                name
            }
        }
    }
`;
