import React, { FunctionComponent, ReactNode } from "react";

import { CardWrapper, Title, Wrapper } from "./Card.sc";

interface Props {
    title: string;
    children: ReactNode;
}

const Card: FunctionComponent<Props> = ({ title, children }) => {
    return (
        <Wrapper>
            <Title>{title}</Title>
            <CardWrapper>{children}</CardWrapper>
        </Wrapper>
    );
};

export default Card;
