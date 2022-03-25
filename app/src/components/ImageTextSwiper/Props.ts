export interface ImageTextPair {
    thumbnailUrl: string;
    title: string;
}

export interface ImagesProps {
    images: ImageTextPair[];
}

export interface SingleImageProps {
    image: ImageTextPair;
}
