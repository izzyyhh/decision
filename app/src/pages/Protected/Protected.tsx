import LinkButton from "@components/LinkButton/LinkButton";
import React, { FunctionComponent } from "react";

const Protected: FunctionComponent = () => {
    return (
        <>
            <h1>You can only see this page if you are logged In</h1>
            <button>Logout</button>
            <LinkButton arrow={true} active={true} link="/decision" primary={true} icon="add">
                Decision
            </LinkButton>
        </>
    );
};

export default Protected;
