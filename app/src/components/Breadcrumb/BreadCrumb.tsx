import React, { FunctionComponent } from "react";

import { BreadCrumbText } from "./BreadCrumb.sc";

interface Iprops {
    link?: string;
}

const BreadCrumb: FunctionComponent<Iprops> = ({ children, link }) => {
    return (
        <>
            <BreadCrumbText>{children}</BreadCrumbText>
        </>
    );
};

export default BreadCrumb
