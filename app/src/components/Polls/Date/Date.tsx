import { useMutation } from "@apollo/client";
import { ColumnFullWidth } from "@app/common/Column.sc";
import { GQLOption } from "@app/graphql.generated";
import Card from "@components/Card/Card";
import LinkButton from "@components/LinkButton/LinkButton";
import { useSnack } from "@context/snackbar/useSnack";
import { useUser } from "@context/user/useUser";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { ADD_DECISION } from "../Binary/pollData.gql";
import { InputWrapper, Label, Option } from "./Date.sc";

interface Props {
    optionsData: GQLOption[];
}

const Binary: FunctionComponent<Props> = ({ optionsData }) => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [active, setActive] = useState<Array<string>>([]);
    const { pollId } = useParams();
    const { t } = useTranslation();
    const userId = user?.id;
    const { setSnack } = useSnack();

    const [data] = useMutation(ADD_DECISION);

    const sendDecision = async () => {
        try {
            const res: any = [];
            active.forEach(async (option) => {
                const response = await data({ variables: { data: { user: userId, poll: pollId, option: option, answer: 0.6 } } });
                res.push(response);
            })

            let noError = true;
            res.forEach((r: any) => {
                if (r.errors) {
                    noError = false;
                }
            })

            if (noError) {
                navigate(`/result/${pollId}`);
            }
        } catch {
            setSnack({ message: "Please choose an option", open: true, severity: "warning" });
        }
    };

    const handleClick = ((optionId: string) => {
        if (!active.includes(optionId)) {
            active.push(optionId);
            setActive(active);
        } else {
            const remove = active.filter((id) => id !== optionId);
            setActive(remove);
        }
    })

    const isActive = ((optionId: string) => {
        return false;
    })

    const convertDate = ((date: string) => {
        const dt = new Date(date);
        const title = dt.toLocaleDateString() + " " + dt.getHours() + ":" + dt.getMinutes();
        return title;
    });

    if (optionsData.length > 0) {
        return (
            <ColumnFullWidth>
                <Card title={t("decision.options")}>
                    
                        {optionsData.map((option) => (
                            <InputWrapper>
                                <Option key={option.id} id={option.id} type="checkbox" value={option.id} onClick={() => handleClick(option.id)} active={isActive(option.id)} >
                                </Option>
                                <Label htmlFor={option.id} active={isActive(option.id)}>
                                    {convertDate(option.title)}
                                </Label>
                            </InputWrapper>
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
