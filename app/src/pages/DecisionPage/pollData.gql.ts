import { gql } from "@apollo/client";

const getPoll = gql`
    query getPoll($data: GetPollDto!) {
        getPoll(data: $data) {
            id
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

export { getPoll as getPoll, getOptions as getOptions };
