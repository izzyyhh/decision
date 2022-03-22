import { useMutation } from "@apollo/client";
import { ColumnFullWidth } from "@app/common/Column.sc";
import { Eyebrow } from "@app/common/Eyebrow.sc";
import BackBtn from "@components/BackBtn/BackBtn";
import Card from "@components/Card/Card";
import Headline from "@components/Headline/Headline";
import Input from "@components/Input/Input";
import LinkButton from "@components/LinkButton/LinkButton";
import Option from "@components/Option/Option";
import TypeSwitch from "@components/TypeSwitch/TypeSwitch";
import { useUser } from "@context/user/useUser";
import { addOptionsMutation, addPollMutation } from "@pages/PollWithType/PollWithType.gql";
import { buildUrl } from "@utils/urlHelpers";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { AppRoutes } from "@app/Router";

export enum Type {
    BINARY = "BINARY",
    TINDER = "TINDER",
    DATE = "DATE",
    NUMERCAL = "NUMERICAL",
}

export interface Option {
    value: string;
    image?: File;
    key: number;
}

const CreateDecision: FunctionComponent = () => {
    const [question, setQuestion] = useState<string>();
    const [options, setOptions] = useState<Array<Option>>([]);
    const [type, setType] = useState<Type>(Type.BINARY);
    const { t } = useTranslation();
    const { user } = useUser();
    const [addPoll] = useMutation(addPollMutation, { variables: { data: { title: question, predefined: false, owner: user?.id, type: type } } });
    const [addOption] = useMutation(addOptionsMutation);
    const [active, setActive] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setOptions([]);
    }, [type]);

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
                <LinkButton active={active} onClick={() => createPoll(type, options, question, addPoll, addOption, setActive, navigate)}>
                    {t("decision.start")}
                </LinkButton>
            </ColumnFullWidth>
        </>
    );
};

const createPoll = async (
    type: Type,
    options: Array<any>,
    question: string | undefined,
    addPollMutation: any,
    addOptionMutation: any,
    setActive: any,
    navigate: any,
) => {
    if (type === Type.BINARY) {
        if (question != undefined && question != "" && options.length == 2) {
            const pollData = await addPollMutation();
            const pollId = pollData.data.addPoll.id;
            const promises: Promise<any>[] = [];

            if (pollId) {
                options.forEach((o) => {
                    promises.push(addOptionMutation({ variables: { data: { poll: pollId, title: o.value } } }));
                });

                Promise.all(promises).then(() => {
                    setActive(false);
                    navigate(`/decision/${pollId}`);
                });
            }
        }
    } else if (type === Type.TINDER) {
        console.log("Ok");
    }
};

export default CreateDecision;
