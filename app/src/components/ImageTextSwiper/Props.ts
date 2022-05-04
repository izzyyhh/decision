import { ModalProps } from "@components/Modals/ModalProps";

export interface ImageTextPair {
    thumbnailUrl: string;
    title: string;
    handler: ModalProps;
}

export interface ImagesProps {
    images: ImageTextPair[];
}

export interface SingleImageProps {
    image: ImageTextPair;
}
