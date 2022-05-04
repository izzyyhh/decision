import { gql } from "@apollo/client";

export const DecisionsPollQuery = gql`
    query getDecisionsForPoll($data: GetDecisionForPollDto!) {
        getDecisionsForPoll(data: $data) {
            option {
                id
                title
            }
            user {
                id
                name
            }
        }
    }
`;

export const CanDecideQuery = gql`
    query canDecide($data: GetDecisionForUserAndPollDto!) {
        canDecide(data: $data)
    }
`;
