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