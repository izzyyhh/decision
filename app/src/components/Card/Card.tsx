import React, { FunctionComponent, ReactNode } from "react";

import { Title, Wrapper } from "./Card.sc";

interface Props {
    title: string;
    children: ReactNode;
}

const Card: FunctionComponent<Props> = ({ title, children }) => {
    return (
        <Wrapper>
            <Title>{title}</Title>
            {children}
        </Wrapper>
    );
};

export default Card;
