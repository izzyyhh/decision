import { useMutation } from "@apollo/client";
import IOption from "@app/types/IOption";
import BreadCrumb from "@components/Breadcrumb/BreadCrumb";
import Headline from "@components/Headline/Headline";
import LinkButton from "@components/LinkButton/LinkButton";
import OptionList from "@components/OptionList/OptionList";
import { useUser } from "@context/user/useUser";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

import { addOptionsMutation, addPollMutation } from "./PollWithType.gql";
import {
    BreadCrumbWrapper,
    ButtonWrapper,
    CreatePollWithTypeWrapper,
    HeadlineWrapper,
    HelpText,
    Input,
    OptionListWrapper,
    OptionWrapper,
    QuestionInput,
} from "./PollWithType.sc";

const PollWithType: FunctionComponent = () => {
    const { t } = useTranslation();
    const { type } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();
    const [question, setQuestion] = useState("Question");
    const [option, setOption] = useState("");
    const [optionPlaceholder, setOptionPlaceholder] = useState("New Option");
    const [options, setOptions] = useState<Array<IOption>>([]);
    const [pollId, setPollId] = useState("");
    const [currentOption, setCurrentOption] = useState("");

    const enumType = type === "binary" ? "BINARY" : "";

    const predefined = false;

    const [data] = useMutation(addPollMutation, { variables: { data: { title: question, predefined, owner: user?.id, type: enumType } } });
    const [optionData] = useMutation(addOptionsMutation, { variables: { data: { title: currentOption, poll: pollId } } });
    const addPollHandler = async () => {
        const pollData = await data();
        const pollId = pollData.data.addPoll.id;
        setPollId(pollId);

        for (const o of options) {
            setCurrentOption(o.name);
            const t = await optionData();
            console.log({ t });
            console.log("asdfaskdlf");
        }
        // const decisionUrl = buildUrl("/result/", { q: p_id });
        navigate(`/result/${pollId}`);
    };

    const setOptionFromIcon = () => {
        if (option !== "") {
            setOptions([...options, { name: option }]);
            setOption("");
            setOptionPlaceholder("Create Option");
        }
    };

    const addOption = (e: any) => {
        if (e.key == "Enter" && e.target.value !== "") {
            setOptions([...options, { name: e.target.value }]);
            setOption("");
            setOptionPlaceholder("Create Option");
        }
    };

    return (
        <CreatePollWithTypeWrapper>
            <HeadlineWrapper>
                <Headline type="h2">{t("decision.headline")}</Headline>
            </HeadlineWrapper>
            <BreadCrumbWrapper>
                <BreadCrumb>Selected Type: {type}</BreadCrumb>
            </BreadCrumbWrapper>
            <HelpText>{t("decision.help")}</HelpText>
            <QuestionInput name="question" type="text" placeholder={question} onChange={(e) => setQuestion(e.target.value)} />
            <OptionWrapper>
                <AddCircleOutlineIcon onClick={setOptionFromIcon}></AddCircleOutlineIcon>
                <Input
                    onKeyUp={addOption}
                    name="option"
                    type="text"
                    placeholder={optionPlaceholder}
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                />
            </OptionWrapper>
            <OptionListWrapper>
                <OptionList options={options} setOptions={setOptions}></OptionList>
            </OptionListWrapper>
            <ButtonWrapper>
                <LinkButton onClick={addPollHandler} arrow={true} active={true} icon={"add"} title={""}>
                    {t("decision.start")}
                </LinkButton>
            </ButtonWrapper>
        </CreatePollWithTypeWrapper>
    );
};

export default PollWithType;
