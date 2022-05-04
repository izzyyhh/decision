import { useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import Seo from "@app/seo/Seo";
import Auth from "@components/Auth/Auth";
import Headline from "@components/Headline/Headline";
import Polls from "@components/Polls/Polls";
import SocialShare from "@components/Share/SocialShare";
import React, { FunctionComponent } from "react";
import { useParams } from "react-router";

import { HeadingWrapper } from "./DecisionPage.sc";
import { getPoll } from "./pollData.gql";

const DecisionPage: FunctionComponent = () => {
    const { pollId } = useParams();
    const poll = useQuery<GQLQuery>(getPoll, { variables: { data: { pollId } } });
    const pollData = poll.data ? poll.data.getPoll : null;
    const shareLink = `${window.location.origin}/decision/${pollId}`;
    const pollType = poll.data?.getPoll.type;

    return (
        <>
            <Seo title={pollData?.title} />
            <Auth>
                <HeadingWrapper>
                    {pollData?.title && <Headline type="h2">{pollData.title}</Headline>}
                    <SocialShare url={shareLink} />
                </HeadingWrapper>
                <Polls poll={pollType} />
            </Auth>
        </>
    );
};

export default DecisionPage;
