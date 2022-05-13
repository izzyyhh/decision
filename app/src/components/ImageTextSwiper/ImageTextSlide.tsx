import React, { FunctionComponent } from "react";

import { DetailWrapper, Image, ImageWrapper, SlideInner, Title } from "./ImageTextSlide.sc";
import { SingleImageProps } from "./Props";

const ImageTextSlide: FunctionComponent<SingleImageProps> = ({ image }) => {
    return (
        <SlideInner onClick={() => image.handler.setOpen(true)}>
            <ImageWrapper>
                <Image src={image.thumbnailUrl} alt={image.title}/>
            </ImageWrapper>
            <DetailWrapper>
                <Title>{image.title}</Title>
            </DetailWrapper>
        </SlideInner>
    );
};

export default ImageTextSlide;
