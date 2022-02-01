import React, { FunctionComponent } from "react";

import { HeadlineH2 } from "./Headline.sc";

interface IProps {
    type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
const Headline: FunctionComponent<IProps> = ({ type, children }) => {
    // Todo add Healdine styles for the other Headline Tags

    if (type === "h2") {
        return <HeadlineH2>{children}</HeadlineH2>;
    }

    return (
        <>
            <h1>{children}</h1>
        </>
    );
};

export default Headline;
