import { Type } from "@pages/CreateDecision/CreateDecision";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Item, Wrapper } from "./TypeSwitch.sc";

interface Props {
    update: (value: Type) => void;
}

const TypeSwitch: FunctionComponent<Props> = ({ update }) => {
    const [option, setOption] = useState<Type>(Type.BINARY);
    const { t } = useTranslation();

    useEffect(() => {
        update(option);
    }, [option]);

    return (
        <Wrapper>
            <Item active={option === Type.BINARY} onClick={() => setOption(Type.BINARY)}>
                {t("decision.binary")}
            </Item>
            <Item active={option === Type.TINDER} onClick={() => setOption(Type.TINDER)}>
                {t("decision.tinder")}
            </Item>
            <Item active={option === Type.DATE} onClick={() => setOption(Type.DATE)}>
                {t("decision.date.title")}
            </Item>
        </Wrapper>
    );
};

export default TypeSwitch;
