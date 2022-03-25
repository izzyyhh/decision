import "swiper/css";

import React, { FunctionComponent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import ImageTextSlide from "./ImageTextSlide";
import { Wrapper } from "./ImageTextSwiper.sc";

const ImageTextSwiper: FunctionComponent = () => {
    return (
        <Wrapper>
            <Swiper spaceBetween={30}>
                <SwiperSlide>
                    <ImageTextSlide />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageTextSlide />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageTextSlide />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageTextSlide />
                </SwiperSlide>
            </Swiper>
        </Wrapper>
    );
};

export default ImageTextSwiper;
