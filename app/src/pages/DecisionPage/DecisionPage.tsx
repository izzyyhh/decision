import { useQuery } from "@apollo/client";
import { GQLOption, GQLQuery } from "@app/graphql.generated";
import Headline from "@components/Headline/Headline";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import React, { FunctionComponent } from "react";

import { AuthWrapper, ButtonWrapper, HeadlineWrapper, MiddleWrapper } from "../Auth/Auth.sc";
import { getOptions, getPoll } from "./pollData.gql";

const DecisionPage: FunctionComponent = () => {
    const pollId = "09268120-d59f-4de9-a81f-a13f9e94e032";
    const copyToClipBoard = () => {
        navigator.clipboard.writeText("HALLO");
    };

    const poll = useQuery<GQLQuery>(getPoll, { variables: { data: { pollId } } });
    const pollData = poll.data ? poll.data.getPoll : null;

    const options = useQuery<GQLQuery>(getOptions, { variables: { data: { pollId } } });
    const optionsData = options.data ? options.data.getOptionsForPoll : [];

    return (
        <AuthWrapper>
            <HeadlineWrapper>{pollData?.title && <Headline type="h2">{pollData.title}</Headline>}</HeadlineWrapper>
            <MiddleWrapper>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label" color="primary" focused={true}>
                        OPTIONEN
                    </FormLabel>
                    <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                        {optionsData.map((option: GQLOption) => (
                            <FormControlLabel
                                key={option.id}
                                value={option.id}
                                control={<Radio color="secondary" required={true} />}
                                label={option.title}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </MiddleWrapper>
            <ButtonWrapper>
                <Button color="primary" variant="contained">
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
