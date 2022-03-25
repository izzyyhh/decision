import { gql } from "@apollo/client";

export const moviesQuery = gql`
    query getMovieOptions {
        getMoviesPreset {
            title
            thumbnailUrl
        }
    }
`;

export const restaurantsQuery = gql`
    query getRestaurants {
        getRestaurantsPreset(data: { latitude: 0, longitude: 0 }) {
            title
            thumbnailUrl
        }
    }
`;
