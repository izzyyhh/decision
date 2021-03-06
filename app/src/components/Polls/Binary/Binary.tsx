import { useLazyQuery, useMutation } from "@apollo/client";
import { ColumnFullWidth } from "@app/common/Column.sc";
import { GQLOption } from "@app/graphql.generated";
import Card from "@components/Card/Card";
import LinkButton from "@components/LinkButton/LinkButton";
import { useSnack } from "@context/snackbar/useSnack";
import { useUser } from "@context/user/useUser";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { CanDecideQuery } from "../Tinder/Tinder.gql";
import { Option } from "./Binary.sc";
import { ADD_DECISION } from "./pollData.gql";

interface Props {
    optionsData: GQLOption[];
}

const Binary: FunctionComponent<Props> = ({ optionsData }) => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [active, setActive] = useState<string>("");
    const { pollId } = useParams();
    const { t } = useTranslation();
    const userId = user?.id;
    const { setSnack } = useSnack();
    const [, { refetch: refetchMadeDecision }] = useLazyQuery(CanDecideQuery, { variables: { data: { user: userId, poll: pollId } } });

    const [data] = useMutation(ADD_DECISION, { variables: { data: { user: userId, poll: pollId, option: active, answer: 0.6 } } });

    const sendDecision = async () => {
        try {
            const res = await data();
            if (!res.errors) {
                navigate(`/result/${pollId}`);
            }
        } catch {
            setSnack({ message: "Please choose an option", open: true, severity: "warning" });
        }
    };

    const canDecide = async (setSnack: (snack: any) => void) => {
        const response = await refetchMadeDecision();
        if (!response?.data.canDecide) {
            setSnack({ message: "already.made.decision.error", open: true, severity: "error" });
            navigate(`/result/${pollId}`);
        }
    };

    useEffect(() => {
        canDecide(setSnack);
    }, []);

    if (optionsData.length > 0) {
        return (
            <ColumnFullWidth>
                <Card title={t("decision.options")}>
                    {optionsData.map((option) => (
                        <Option key={option.id} active={active === option.id} onClick={() => setActive(option.id)}>
                            {option.title}
                        </Option>
                    ))}
                </Card>

                <LinkButton onClick={sendDecision} arrow={false} active={true} title={""}>
                    {t("decision.vote")}
                </LinkButton>
            </ColumnFullWidth>
        );
    }

    return <></>;
};

export default Binary;
