import { gql } from "@apollo/client";

export const genresAll = gql`
    query genresAll {
        genresAll {
            title
        }
    }
`;

export const fetchMoviesPreset = gql`
    query fetchMoviesPreset($data: GetMoviePresetDto!) {
        fetchMoviePreset(data: $data) {
            title
            posterPath
            genres
        }
    }
`;
