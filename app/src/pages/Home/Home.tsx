import LinkButton from "@components/LinkButton/LinkButton";
import React, { FunctionComponent } from "react";

const Home: FunctionComponent = () => {
    return (
        <>
            <LinkButton link="/step-1" primary={true} icon="add" title="Next Step" />
        </>
    );
};

export default Home;
