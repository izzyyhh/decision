import LinkButton from "@components/LinkButton/LinkButton";
import { buildUrl, useSearchParams } from "@utils/urlHelpers";
import React, { FunctionComponent } from "react";

const Join: FunctionComponent = () => {
    const [params] = useSearchParams();
    const pid = params.get("q");
    const url = buildUrl("/decision", { q: pid });
    return (
        <>
            <LinkButton active={true} arrow={true} link={url} primary={true} icon="add">
                AMK ich mach mit
            </LinkButton>
        </>
    );
};

export default Join;
