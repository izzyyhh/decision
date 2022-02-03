import { useMutation, useQuery } from "@apollo/client";
import { GQLOption, GQLQuery } from "@app/graphql.generated";
import Headline from "@components/Headline/Headline";
import {useUser} from "@context/user/useUser";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";

import { AuthWrapper, ButtonWrapper, HeadlineWrapper, MiddleWrapper } from "../Auth/Auth.sc";
import {addDecision,getOptions, getPoll } from "./pollData.gql";

const DecisionPage: FunctionComponent = () => {
    const pollId = "09268120-d59f-4de9-a81f-a13f9e94e032";
    const userId = "b2aad1a7-3fbe-4190-9d76-c76dd6422fb9"

    const [optionId, setOption] = useState(); 
    const {user} = useUser();

    const poll = useQuery<GQLQuery>(getPoll, { variables: { data: { pollId } } });
    const pollData = poll.data ? poll.data.getPoll : null;

    const options = useQuery<GQLQuery>(getOptions, { variables: { data: { pollId } } });
    const optionsData = options.data ? options.data.getOptionsForPoll : [];
    
    const [data] = useMutation(addDecision, {variables: {data: {user: userId, poll: pollId, option: optionId, answer: 0.6}}})

    const copyToClipBoard = () => {
        navigator.clipboard.writeText("HALLO");
    };

    const sendDecision = async () => {
        const res = await data()
        console.log("asdf")
        console.log(res, "res");

    }

    console.log(user, "user");

    return (
        <AuthWrapper>
            <HeadlineWrapper>{pollData?.title && <Headline type="h2">{pollData.title}</Headline>}</HeadlineWrapper>
            <MiddleWrapper>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label" color="primary" focused={true}>
                        OPTIONEN
                    </FormLabel>
                    <RadioGroup onChange={(e) => setOption(e.target.value)}aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                        {optionsData.map((option: GQLOption) => (
                            <FormControlLabel
                                key={option.id}
                                value={option.id}
                                control={<Radio color="secondary" required={true} onSelect={(e) => console.log(e)} />}
                                label={option.title}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </MiddleWrapper>
            <ButtonWrapper>
                <Button color="primary" variant="contained" onClick={() => sendDecision()}>
                    VOTE
                </Button>
                <Button color="primary" variant="contained" onClick={() => copyToClipBoard()}>
                    Copy SHARELINK
                </Button>
            </ButtonWrapper>
        </AuthWrapper>
    );
};

export default DecisionPage;
