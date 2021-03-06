import { useMutation } from "@apollo/client";
import { ColumnFullWidth } from "@app/common/Column.sc";
import { Eyebrow } from "@app/common/Eyebrow.sc";
import config from "@app/config";
import Seo from "@app/seo/Seo";
import Auth from "@components/Auth/Auth";
import BackBtn from "@components/BackBtn/BackBtn";
import Card from "@components/Card/Card";
import Headline from "@components/Headline/Headline";
import LinkButton from "@components/LinkButton/LinkButton";
import Option from "@components/Option/Option";
import ShareModal from "@components/ShareModal/ShareModal";
import TypeSwitch from "@components/TypeSwitch/TypeSwitch";
import { useSnack } from "@context/snackbar/useSnack";
import { useUser } from "@context/user/useUser";
import { useAuthToken } from "@hooks/useAuthToken";
import { addOptionsMutation, addPollMutation } from "@pages/PollWithType/PollWithType.gql";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { StyledInput } from "./CreateDecision.sc";

export enum Type {
    BINARY = "BINARY",
    TINDER = "TINDER",
    DATE = "DATE",
}

export interface Option {
    value: string | Date;
    image?: File;
    key: number;
}

const CreateDecision: FunctionComponent = () => {
    const [question, setQuestion] = useState<string>("");
    const [options, setOptions] = useState<Array<Option>>([]);
    const [type, setType] = useState<Type>(Type.BINARY);
    const { t } = useTranslation();
    const { user } = useUser();
    const [addPoll] = useMutation(addPollMutation, { variables: { data: { title: question, predefined: false, owner: user?.id, type: type } } });
    const [addOption] = useMutation(addOptionsMutation);
    const [active, setActive] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [pollId, setPollId] = useState<string>("");
    const [authToken] = useAuthToken();
    const { setSnack } = useSnack();

    useEffect(() => {
        if (question.length > 0 && options.length >= 1) {
            setActive(true);
        }
    }, [question, options]);

    useEffect(() => {
        setOptions([]);
    }, [type]);

    return (
        <>
            <Seo title={t("decision.headline")} />
            {openModal && <ShareModal pollId={pollId} />}
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
                        <StyledInput label={t("create.question.title")} update={(value: string) => setQuestion(value)} />
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
                        classProp={"decision-create"}
                        active={active}
                        onClick={() => createPoll(type, options, question, addPoll, addOption, setOpenModal, setPollId, setSnack, authToken)}
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
    options: Array<Option>,
    question: string,
    addPollMutation: any,
    addOptionMutation: any,
    setOpenModal: (value: boolean) => void,
    setPollId: (value: string) => void,
    setSnack: any,
    authToken: string,
) => {
    if (question == undefined || question == "") {
        setSnack({ message: "Question is missing", open: true, severity: "warning" });
    }

    const pollData = await addPollMutation();
    const pollId = pollData.data.addPoll.id;

    setPollId(pollId);

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
            const promises: Promise<any>[] = [];

            if (pollId) {
                options.forEach((o) => {
                    promises.push(addOptionMutation({ variables: { data: { poll: pollId, title: o.value, thumbnailUrl: "" } } }));
                });

                Promise.all(promises)
                    .then(() => {
                        setOpenModal(true);
                    })
                    .catch(() => {
                        setSnack({ message: "An error occurd. Please try again", open: true, severity: "warning" });
                    });
            }
        }
    } else if (type === Type.TINDER) {
        if (options.length <= 1) {
            setSnack({ message: "Please add at least one more option", open: true, severity: "warning" });
        }

        if (question != undefined && question != "" && options.length > 1) {
            const imagePromises: Promise<any>[] = [];

            for (const option of options) {
                const optionId = await addOptionMutation({ variables: { data: { poll: pollId, title: option.value, thumbnailUrl: "" } } });

                if (optionId.data.addOption.id && option?.image) {
                    imagePromises.push(uploadImage(option.image, optionId.data.addOption.id, authToken));
                }
            }

            Promise.all(imagePromises).then(() => {
                setOpenModal(true);
            });
        }
    } else if (type === Type.DATE) {
        if (options.length < 2) {
            setSnack({ message: "Please add at least one more option", open: true, severity: "warning" });
        }
        if (question != undefined && question != "" && options.length >= 2) {
            const promises: Promise<any>[] = [];

            if (pollId) {
                options.forEach((o) => {
                    promises.push(addOptionMutation({ variables: { data: { poll: pollId, title: o.value, thumbnailUrl: "" } } }));
                });

                Promise.all(promises).then(() => {
                    setOpenModal(true);
                });
            }
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
