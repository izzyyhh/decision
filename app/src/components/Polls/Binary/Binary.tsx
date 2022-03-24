import { useMutation, useQuery } from "@apollo/client";
import { ColumnFullWidth } from "@app/common/Column.sc";
import { GQLQuery } from "@app/graphql.generated";
import Card from "@components/Card/Card";
import LinkButton from "@components/LinkButton/LinkButton";
import { useUser } from "@context/user/useUser";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { Option } from "./Binary.sc";
import { addDecision, getOptions } from "./pollData.gql";

const Binary: FunctionComponent = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [active, setActive] = useState<string>("");
    const { pollId } = useParams();
    const { t } = useTranslation();
    const userId = user?.id;

    const options = useQuery<GQLQuery>(getOptions, { variables: { data: { pollId } } });
    const optionsData = options.data ? options.data.getOptionsForPoll : [];

    const [data] = useMutation(addDecision, { variables: { data: { user: userId, poll: pollId, option: active, answer: 0.6 } } });

    const sendDecision = async () => {
        const res = await data();
        if (!res.errors) {
            navigate(`/result/${pollId}`);
        }
    };

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
