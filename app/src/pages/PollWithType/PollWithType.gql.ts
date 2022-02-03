import { gql } from "@apollo/client";

export const addPollMutation = gql`
    mutation addPoll($data: PollInput!) {
        addPoll(data: $data) {
            id
            title
        }
    }
`;

export const addOptionsMutation = gql`
    mutation addOption($data: OptionInput!) {
        addOption(data: $data) {
            id
            title
        }
    }
`;
