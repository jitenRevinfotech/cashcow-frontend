import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import fetch from "cross-fetch";

export const client = new ApolloClient({
  link: new HttpLink({
    fetch,
    uri: "https://api.thegraph.com/subgraphs/name/jitenrevinfotech/exchange",
  //  uri: 'https://api.thegraph.com/subgraphs/name/sivarevinfotech/exchange'
  }),
  cache: new InMemoryCache(),
});
