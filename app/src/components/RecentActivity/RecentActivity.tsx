import LinkButton from "@components/LinkButton/LinkButton";
import React, { FunctionComponent } from "react";

import { Wrapper } from "./RecentActivity.sc";

const RecentActivity: FunctionComponent = () => {
    return (
        <Wrapper>
            <LinkButton active={true} primary={false} arrow={true}>
                Activity 1
            </LinkButton>
            <LinkButton active={true} primary={false} arrow={true}>
                Activity 2
            </LinkButton>
        </Wrapper>
    );
};

export default RecentActivity;
