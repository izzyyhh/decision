import { gql } from "@apollo/client";

export default gql`
    query getPresets {
        presetsAll {
            title
            thumbnailUrl
        }
    }
`;
