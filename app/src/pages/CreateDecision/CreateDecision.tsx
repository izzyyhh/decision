import { useMutation } from "@apollo/client";
import { ColumnFullWidth } from "@app/common/Column.sc";
import { Eyebrow } from "@app/common/Eyebrow.sc";
import config from "@app/config";
import Seo from "@app/seo/Seo";
import Auth from "@components/Auth/Auth";
import BackBtn from "@components/BackBtn/BackBtn";
import Card from "@components/Card/Card";
import Headline from "@components/Headline/Headline";
import Input from "@components/Input/Input";
import LinkButton from "@components/LinkButton/LinkButton";
import Option from "@components/Option/Option";
import TypeSwitch from "@components/TypeSwitch/TypeSwitch";
import { useSnack } from "@context/snackbar/useSnack";
import { useUser } from "@context/user/useUser";
import { useAuthToken } from "@hooks/useAuthToken";
import { addOptionsMutation, addPollMutation } from "@pages/PollWithType/PollWithType.gql";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

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
    const [authToken] = useAuthToken();
    const { setSnack } = useSnack();

    useEffect(() => {
        setOptions([]);
    }, [type]);

    return (
        <>
            <Seo title={t("decision.headline")} />
            <Auth>
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
                    <LinkButton
                        active={active}
                        onClick={() => createPoll(type, options, question, addPoll, addOption, setActive, navigate, setSnack, authToken)}
                    >
                        {t("decision.start")}
                    </LinkButton>
                </ColumnFullWidth>
            </Auth>
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
    setSnack: any,
    authToken: string,
) => {
    if (question == undefined || question == "") {
        setSnack({ message: "Question is missing", open: true, severity: "warning" });
    }
    if (type === Type.BINARY) {
        if (options.length !== 2) {
            if (options.length == 1) {
                setSnack({ message: "Please add 1 more option", open: true, severity: "warning" });
            }
            if (options.length == 0) {
                setSnack({ message: "Please add 2 options", open: true, severity: "warning" });
            }
        }

        if (question != undefined && question != "" && options.length == 2) {
            const pollData = await addPollMutation();
            const pollId = pollData.data.addPoll.id;
            const promises: Promise<any>[] = [];

            if (pollId) {
                options.forEach((o) => {
                    promises.push(addOptionMutation({ variables: { data: { poll: pollId, title: o.value, thumbnailUrl: "" } } }));
                });

                Promise.all(promises)
                    .then(() => {
                        setActive(false);
                        navigate(`/decision/${pollId}`);
                    })
                    .catch(() => {
                        setSnack({ message: "Please choose an option", open: true, severity: "warning" });
                    });
            }
        }
    } else if (type === Type.TINDER) {
        if (options.length <= 1) {
            setSnack({ message: "Please add at least one more option", open: true, severity: "warning" });
        }

        if (question != undefined && question != "" && options.length > 1) {
            console.log(type);
            const pollData = await addPollMutation();
            const pollId = pollData.data.addPoll.id;
            const imagePromises: Promise<any>[] = [];

            options.forEach(async (o) => {
                const optionId = await addOptionMutation({ variables: { data: { poll: pollId, title: o.value, thumbnailUrl: "" } } });

                if (optionId.data.addOption.id) {
                    imagePromises.push(uploadImage(o.image, optionId.data.addOption.id, authToken));
                }
            });

            Promise.all(imagePromises).then(() => {
                setActive(false);
                navigate(`/decision/${pollId}`);
            });
        }
    }
};

const uploadImage = (file: File, optionId: string, authToken: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("optionId", optionId);

    return fetch(`${config.REACT_APP_API_URL}/test/test`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
};

export default CreateDecision;
