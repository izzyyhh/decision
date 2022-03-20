import React, { FunctionComponent } from "react";

import { DetailWrapper, Image, ImageWrapper, SlideInner, Title } from "./ImageTextSlide.sc";

const ImageTextSlide: FunctionComponent = () => {
    return (
        <SlideInner>
            <ImageWrapper>
                <Image src="https://picsum.photos/id/1/200/300" />
            </ImageWrapper>
            <DetailWrapper>
                <Title>Slide</Title>
            </DetailWrapper>
        </SlideInner>
    );
};

export default ImageTextSlide;
