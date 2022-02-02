import Headline from "@components/Headline/Headline";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import React, { FunctionComponent } from "react";

import { AuthWrapper, ButtonWrapper, HeadlineWrapper, MiddleWrapper } from "../Auth/Auth.sc";

const DecisionPage: FunctionComponent = () => {
    const copyToClipBoard = () => {
        navigator.clipboard.writeText("HALLO");
    };
    return (
        <AuthWrapper>
            <HeadlineWrapper>
                <Headline type="h2">Abstimmung treffen amk</Headline>
            </HeadlineWrapper>
            <MiddleWrapper>
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label" color="primary" focused={true} >OPTIONEN</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group" >
                    <FormControlLabel value="female" control={<Radio color="secondary" required={ true } />} label="Female" />
                    <FormControlLabel value="male" control={<Radio color="secondary" required={ true } />} label="Male" />
                </RadioGroup>
                </FormControl>
            </MiddleWrapper>
            <ButtonWrapper>
                <Button color="primary" variant="contained">
                    VOTE
                </Button>
                <br/>
                <Button color="primary" variant="contained" onClick={ () => copyToClipBoard()}>
                    Copy SHARELINK
                </Button>
            </ButtonWrapper>
        </AuthWrapper>
    );
};

export default DecisionPage;
