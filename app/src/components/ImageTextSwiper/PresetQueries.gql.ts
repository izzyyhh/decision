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
    query getRestaurants($data: CityDto!) {
        getRestaurantsPreset(data: $data) {
            title
            thumbnailUrl
        }
    }
`;
