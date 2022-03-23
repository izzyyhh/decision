import { gql } from "@apollo/client";

export default gql`
    query getActivity($data: ActivityInput!) {
        getActivity(data: $data) {
            name
            date
            type
            id
        }
    }
`;
