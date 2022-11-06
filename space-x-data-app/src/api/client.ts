import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          capsules: {
            keyArgs: [],
            merge(
              existing: Array<any> | undefined,
              incomming: Array<any>,
              { args: { offset = 0 } }: any
            ) {
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incomming.length; ++i) {
                merged[offset + i] = incomming[i];
              }
              return merged;
            },
          },
        },
      },
    },
  }),
});
