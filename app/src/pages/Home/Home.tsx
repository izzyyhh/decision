import { gql, useQuery } from "@apollo/client";
import { GQLProduct } from "@app/graphql.generated";
import React, { FunctionComponent } from "react";

const Home: FunctionComponent = () => {
    const testquery = gql`
        query {
            productsAll {
                id
                name
                description
                createdAt
                updatedAt
                sales
            }
        }
    `;
    const test = useQuery<GQLProduct>(testquery);
    console.log(test);
    return (
        <>
            <h1>Hello World</h1>
        </>
    );
};

export default Home;
