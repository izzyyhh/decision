import { useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import ImageTextSwiper from "@components/ImageTextSwiper/ImageTextSwiper";
import { moviesQuery, restaurantsQuery } from "@components/ImageTextSwiper/PresetQueries.gql";
import { ModalProps } from "@components/Modals/ModalProps";
import MoviesModal from "@components/Modals/MoviesModal/MoviesModal";
import RestaurantModal from "@components/Modals/RestaurantModal/RestaurantModal";
import React, { FunctionComponent } from "react";

import getPresetQuery from "./getPresets.gql";

const PresetSlider: FunctionComponent = () => {
    const [openRestauraunt, setOpenRestaurant] = React.useState(false);
    const [openMovies, setOpenMovies] = React.useState(false);

    const RestaurantHandler: ModalProps = {
        open: openRestauraunt,
        setOpen: setOpenRestaurant,
        handleClose: (data) => {
            console.log(data);
            //getoptions
            //createDecision
            //navigate
            setOpenRestaurant(false);
        },
        getOptionsList: (data) => data.getRestaurantsPreset,
        query: restaurantsQuery,
    };
    const MoviesHandler: ModalProps = {
        open: openMovies,
        setOpen: setOpenMovies,
        handleClose: (data) => {
            console.log(data);
            //getoptions
            //createDecision
            //navigate
            setOpenMovies(false);
        },
        getOptionsList: (data) => data.getMoviesPreset,
        query: moviesQuery,
    };

    const { data } = useQuery<GQLQuery>(getPresetQuery);

    let images: Array<any> = [];
    if (data) {
        images = data.presetsAll ?? [];
        images = images.map((img) => {
            const i = { ...img };
            if (img.title == "Restaurants") {
                i.handler = RestaurantHandler;
            }
            if (img.title == "Movies") {
                i.handler = MoviesHandler;
            }
            return i;
        });
    }

    return (
        <>
            <ImageTextSwiper images={images} />;
            <RestaurantModal {...RestaurantHandler} />
            <MoviesModal {...MoviesHandler} />
        </>
    );
};

export default PresetSlider;
