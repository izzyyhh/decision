import { gql } from "@apollo/client";

export const refreshTokenQuery = gql`
    query refreshToken($data: RefreshTokenInput!) {
        refreshToken(data: $data)
    }
`;
