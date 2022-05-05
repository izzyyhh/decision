import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import ImageTextSwiper from "@components/ImageTextSwiper/ImageTextSwiper";
import { moviesQuery, restaurantsQuery } from "@components/ImageTextSwiper/PresetQueries.gql";
import { ModalProps } from "@components/Modals/ModalProps";
import MoviesModal from "@components/Modals/MoviesModal/MoviesModal";
import RestaurantModal from "@components/Modals/RestaurantModal/RestaurantModal";
import { useSnack } from "@context/snackbar/useSnack";
import { useUser } from "@context/user/useUser";
import { Type } from "@pages/CreateDecision/CreateDecision";
import { addOptionsMutation, addPollMutation } from "@pages/PollWithType/PollWithType.gql";
import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router";

import getPresetQuery from "./getPresets.gql";

const PresetSlider: FunctionComponent = () => {
    const [openRestauraunt, setOpenRestaurant] = React.useState(false);
    const [openMovies, setOpenMovies] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [getRestaurants] = useLazyQuery(restaurantsQuery);
    const [addOption] = useMutation(addOptionsMutation);
    const { setSnack } = useSnack();
    const { user } = useUser();
    const [addPoll] = useMutation(addPollMutation, {
        variables: { data: { title: title, predefined: true, owner: user?.id, type: Type.TINDER } },
    });
    const navigate = useNavigate();

    const createPoll = async (options: Array<any>, question: string | undefined) => {
        if (question != undefined && question != "" && options.length > 1) {
            setTitle(question);
            const pollData = await addPoll();
            const pollId = pollData.data.addPoll.id;

            await options.forEach(async (o) => {
                await addOption({ variables: { data: { poll: pollId, title: o.title, thumbnailUrl: o.thumbnailUrl } } });
            });

            navigate(`/decision/${pollId}`);
        }
    };

    const RestaurantHandler: ModalProps = {
        open: openRestauraunt,
        setOpen: setOpenRestaurant,
        handleClose: async (data) => {
            try {
                const r = await getRestaurants({ variables: { data: { name: data.name, amount: data.amount } } });
                if (r.error) {
                    console.log("error");
                } else {
                    const options = r.data.getRestaurantsPreset;
                    setOpenRestaurant(false);
                    createPoll(options, data.title);
                }
            } catch (e) {
                setSnack({ message: "Error", open: true, severity: "error" });
            }
        },
        getOptionsList: (data) => data.getRestaurantsPreset,
        query: restaurantsQuery,
    };
    const MoviesHandler: ModalProps = {
        open: openMovies,
        setOpen: setOpenMovies,
        handleClose: (data) => {
            moviesQuery;
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
            <ImageTextSwiper images={images} />
            <RestaurantModal {...RestaurantHandler} />
            <MoviesModal {...MoviesHandler} />
        </>
    );
};

export default PresetSlider;
