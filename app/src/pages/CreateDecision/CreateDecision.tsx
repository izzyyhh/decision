import { ColumnFullWidth } from "@app/common/Column.sc";
import { Eyebrow } from "@app/common/Eyebrow.sc";
import BackBtn from "@components/BackBtn/BackBtn";
import Card from "@components/Card/Card";
import Headline from "@components/Headline/Headline";
import Input from "@components/Input/Input";
import LinkButton from "@components/LinkButton/LinkButton";
import Option from "@components/Option/Option";
import TypeSwitch from "@components/TypeSwitch/TypeSwitch";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export enum Type {
    binare = "binare",
    tinder = "tinder",
    date = "date",
}

export interface Option {
    value: string;
    image?: File;
    key: number;
}

const CreateDecision: FunctionComponent = () => {
    const [question, setQuestion] = useState<string>();
    const [options, setOptions] = useState<Array<Option>>([]);
    const [type, setType] = useState<Type>(Type.binare);
    const { t } = useTranslation();

    useEffect(() => {
        setOptions([]);
    }, [type]);

    console.log(question);
    console.log(type);
    console.log(options);

    return (
        <>
            <BackBtn />
            <ColumnFullWidth>
                <Headline type="h2">{t("decision.headline")}</Headline>
            </ColumnFullWidth>
            <ColumnFullWidth>
                <Eyebrow>{t("decision.type")}</Eyebrow>
            </ColumnFullWidth>
            <ColumnFullWidth>
                <Card title={t("create.question.title")}>
                    <Input label={t("create.question.title")} update={(value: string) => setQuestion(value)} />
                </Card>
            </ColumnFullWidth>
            <ColumnFullWidth>
                <Card title={t("create.type.title")}>
                    <TypeSwitch update={(value) => setType(value)} />
                </Card>
            </ColumnFullWidth>
            <ColumnFullWidth>
                <Card title={t("create.options.title")}>
                    <Option typeDecision={type} update={(values: Array<any>) => setOptions(values)} />
                </Card>
            </ColumnFullWidth>
            <ColumnFullWidth>
                <LinkButton active={true}>{t("decision.start")}</LinkButton>
            </ColumnFullWidth>
        </>
    );
};

export default CreateDecision;
