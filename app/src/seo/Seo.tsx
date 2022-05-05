import config from "@app/config";
import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

interface Props {
    title?: string;
}

const Seo: FunctionComponent<Props> = ({ title }) => {
    return (
        <Helmet
            link={[{ rel: "canonical", href: window.location.href }]}
            title={`${config.REACT_APP_SITE_TITLE} ${title === undefined ? "- Decide Fast" : ` | ${title}`} `}
        >
            <meta
                name="keywords"
                content="decision, decision tree, decision making, make a decision, movie, tv movie, netflix filme, netflix, netflix decison, serien netflix"
            />
            <meta name="robots" content="index" />
            <meta name="author" content="Matthias Riedl, Stefan Maier, Valentin Kiefl, Ismail Halili" />
            <meta name="publisher" content="FH Salzburg" />
            <meta property="og:title" content={`${config.REACT_APP_SITE_TITLE} ${title === undefined ? " Make fast Decisions" : ` | ${title}`} `} />
            <meta
                property="og:description"
                content="This decision app is designed to help you make a decision that you will be happy with. It's easy to use and can be used in a variety of situations."
            />
            <meta property="og:image" content="./decsion.jpeg" />
        </Helmet>
    );
};

export default Seo;
