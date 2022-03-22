import { Option as OptionInterface, Type } from "@pages/CreateDecision/CreateDecision";
import React, { FunctionComponent, useEffect, useState } from "react";

import Binare from "./Binare/Binare";
import Tinder from "./Tinder/Tinder";

interface Props {
    typeDecision: Type;
    update: (values: Array<OptionInterface>) => void;
}

const Options: any = {
    binare: Binare,
    tinder: Tinder,
};

const Option: FunctionComponent<Props> = ({ typeDecision, update }) => {
    const [options, setOptions] = useState<Array<OptionInterface>>([]);

    useEffect(() => {
        update(options);
    }, [options]);

    if (typeof Options[typeDecision] !== "undefined") {
        const Component = Options[typeDecision];
        return (
            <>
                <Component update={(values: Array<any>) => setOptions(values)} />
            </>
        );
    }

    return (
        <div>
            <p>
                The component <strong>{typeDecision}</strong> has not been created yet.
            </p>
        </div>
    );
};

export default Option;
