import { useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import ImageTextSwiper from "@components/ImageTextSwiper/ImageTextSwiper";
import React, { FunctionComponent } from "react";

import getPresetQuery from "./getPresets.gql";

const PresetSlider: FunctionComponent = () => {
    const { data } = useQuery<GQLQuery>(getPresetQuery);

    let images: Array<any> = [];
    if (data) {
        images = data.presetsAll ?? [];
    }
    return <ImageTextSwiper images={images} />;
};

export default PresetSlider;
