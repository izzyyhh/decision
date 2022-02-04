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

import { addPollMutation } from "./PollWithType.gql";
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
    const [test1, setPollId] = useState<string>("");
    const [test2, setCurrentOption] = useState<string>("");

    const enumType = type === "binary" ? "BINARY" : "";

    const predefined = false;

    const [data] = useMutation(addPollMutation, { variables: { data: { title: question, predefined, owner: user?.id, type: enumType } } });
    const addPollHandler = async () => {
        const pollData = await data();
        const pollId: string = pollData.data.addPoll.id;
        setPollId(pollId ? pollId : "");

        console.log(test1, test2);

        for (const option of options) {
            setCurrentOption(`${option.name}`);
        }
        navigate(`/decision/${pollId}`);
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
            {(options.length < 2 && 
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
            )}
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
