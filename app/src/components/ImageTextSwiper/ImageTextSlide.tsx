import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "@context/user/useUser";
import { Type } from "@pages/CreateDecision/CreateDecision";
import { addOptionsMutation, addPollMutation } from "@pages/PollWithType/PollWithType.gql";
import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router";

import { DetailWrapper, Image, ImageWrapper, SlideInner, Title } from "./ImageTextSlide.sc";
import { moviesQuery, restaurantsQuery } from "./PresetQueries.gql";
import { SingleImageProps } from "./Props";

const ImageTextSlide: FunctionComponent<SingleImageProps> = ({ image }) => {
    const [addOption] = useMutation(addOptionsMutation);
    const { user } = useUser();
    const [addPoll] = useMutation(addPollMutation, {
        variables: { data: { title: image.title, predefined: true, owner: user?.id, type: Type.TINDER } },
    });
    const navigate = useNavigate();

    const q = image.title === "Movies" ? moviesQuery : restaurantsQuery;
    const { data } = useQuery(q);

    const getOptionsList = (response: any) => {
        if (image.title === "Movies") {
            return response.getMoviesPreset;
        }
        return response.getRestaurantsPreset;
    };

    const create = async () => {
        console.log(data);
        const options = getOptionsList(data).slice(0, 7);

        createPoll(options, image.title, addPoll, addOption, navigate);
    };

    return (
        <SlideInner onClick={create}>
            <ImageWrapper>
                <Image src={image.thumbnailUrl} />
            </ImageWrapper>
            <DetailWrapper>
                <Title>{image.title}</Title>
            </DetailWrapper>
        </SlideInner>
    );
};

const createPoll = async (options: Array<any>, question: string | undefined, addPollMutation: any, addOptionMutation: any, navigate: any) => {
    if (question != undefined && question != "" && options.length > 1) {
        const pollData = await addPollMutation();
        const pollId = pollData.data.addPoll.id;

        await options.forEach(async (o) => {
            await addOptionMutation({ variables: { data: { poll: pollId, title: o.title, thumbnailUrl: o.thumbnailUrl } } });
        });

        navigate(`/decision/${pollId}`);
    }
};

export default ImageTextSlide;
