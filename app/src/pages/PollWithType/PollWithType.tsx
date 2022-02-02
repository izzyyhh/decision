import IOption from "@app/types/IOption";
import BreadCrumb from "@components/Breadcrumb/BreadCrumb";
import Headline from "@components/Headline/Headline";
import LinkButton from "@components/LinkButton/LinkButton";
import OptionList from "@components/OptionList/OptionList";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { BreadCrumbWrapper, ButtonWrapper, CreatePollWithTypeWrapper, HeadlineWrapper, HelpText, Input, OptionListWrapper, OptionWrapper, QuestionInput } from "./PollWithType.sc";



const PollWithType: FunctionComponent = () => {
    const { t } = useTranslation();
    const { type } = useParams();
    const [question, setQuestion] = useState("Question");
    const [option, setOption] = useState("");
    const [optionPlaceholder, setOptionPlaceholder] = useState("New Option");
    const [options, setOptions] = useState<Array<IOption>>([])

    const setOptionFromIcon = () => {
        if (option !== "") {
            setOptions([
                ...options, {name: option}
            ]);
            setOption("");
            setOptionPlaceholder("Create Option");
        }
    }

    const addOption = (e: KeyboardEvent) => {
        if (e.key == "Enter" && e.target.value !== "") {
            setOptions([
                ...options, {name: e.target.value}
            ]);
            setOption("");
            setOptionPlaceholder("Create Option");
        }
    }
    
    return (
        <CreatePollWithTypeWrapper>
            <HeadlineWrapper>
                <Headline type="h2">{t("decision.headline")}</Headline> 
            </HeadlineWrapper>
            <BreadCrumbWrapper>
                <BreadCrumb>Selected Type: {type}</BreadCrumb>
            </BreadCrumbWrapper>
            <HelpText>
                {t("decision.help")}
            </HelpText>
            <QuestionInput name="question" type="text" placeholder={question} onChange={(e) => setQuestion(e.target.value)} />
            <OptionWrapper>
                <AddCircleOutlineIcon onClick={setOptionFromIcon}></AddCircleOutlineIcon>
                <Input onKeyUp={addOption} name="option" type="text" placeholder={optionPlaceholder} value={option} onChange={(e) => setOption(e.target.value)} />
            </OptionWrapper>
            <OptionListWrapper>
                <OptionList options={options} setOptions={setOptions}></OptionList>
            </OptionListWrapper>
            <ButtonWrapper>
                <LinkButton link={"/binary"} icon={"add"}>{t("decision.start")}</LinkButton>
            </ButtonWrapper>
        </CreatePollWithTypeWrapper>
    )
}

export default PollWithType;
