import "swiper/css";

import React, { FunctionComponent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import ImageTextSlide from "./ImageTextSlide";
import { Wrapper } from "./ImageTextSwiper.sc";
import { ImagesProps } from "./Props";

const ImageTextSwiper: FunctionComponent<ImagesProps> = ({ images }) => {
    console.log(images, "2");
    return (
        <Wrapper>
            <Swiper spaceBetween={30} slidesPerView={1}>
                {images.map((image, idx) => (
                    <SwiperSlide key={image.title}>
                        <ImageTextSlide image={image} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Wrapper>
    );
};

export default ImageTextSwiper;
