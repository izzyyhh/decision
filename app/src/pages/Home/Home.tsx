import { gql, useQuery } from "@apollo/client";
import { GQLProduct, GQLQuery } from "@app/graphql.generated";
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
    const test = useQuery<GQLQuery>(testquery);
    return (
        <>
            <h1>Hello World 1it aTest voll new</h1>
            <p>A List of products</p>
            <ul>{test.data?.productsAll && test.data.productsAll.map((product: GQLProduct) => <li>{product.name}</li>)}</ul>
        </>
    );
};

export default Home;
