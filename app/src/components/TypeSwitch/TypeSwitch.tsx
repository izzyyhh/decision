import { Type } from "@pages/CreateDecision/CreateDecision";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Item, Wrapper } from "./TypeSwitch.sc";

interface Props {
    update: (value: Type) => void;
}

const TypeSwitch: FunctionComponent<Props> = ({ update }) => {
    const [option, setOption] = useState<Type>(Type.binare);
    const { t } = useTranslation();

    useEffect(() => {
        update(option);
    }, [option]);

    return (
        <Wrapper>
            <Item active={option === Type.binare} onClick={() => setOption(Type.binare)}>
                {t("decision.binary")}
            </Item>
            <Item active={option === Type.tinder} onClick={() => setOption(Type.tinder)}>
                {t("decision.tinder")}
            </Item>
            <Item active={option === Type.date} onClick={() => setOption(Type.date)}>
                {t("decision.date")}
            </Item>
        </Wrapper>
    );
};

export default TypeSwitch;
