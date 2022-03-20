import "swiper/css";

import React, { FunctionComponent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import ImageTextSlide from "./ImageTextSlide";
import { Wrapper } from "./ImageTextSwiper.sc";

const ImageTextSwiper: FunctionComponent = () => {
    return (
        <Wrapper>
            <Swiper spaceBetween={30} slidesPerView={1} onSlideChange={() => console.log("slide change")} onSwiper={(swiper) => console.log(swiper)}>
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
