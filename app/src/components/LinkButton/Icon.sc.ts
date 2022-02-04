import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import BallotIcon from "@material-ui/icons/Ballot";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import Share from "@material-ui/icons/Share";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import styled, { css } from "styled-components";

const IconStyle = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
`;

export const AddIcon = styled(AddCircleOutlineIcon)`
    ${IconStyle}
`;

export const VoteIcon = styled(HowToVoteIcon)`
    ${IconStyle}
`;
export const ShareIcon = styled(Share)`
    ${IconStyle}
`;

export const BinarIcon = styled(BallotIcon)`
    ${IconStyle}
`;

export const CalenderIcon = styled(InsertInvitationIcon)`
    ${IconStyle}
`;

export const TinderIcon = styled(WhatshotIcon)`
    ${IconStyle}
`;

export const ScaleIcon = styled(LinearScaleIcon)`
    ${IconStyle}
`;
