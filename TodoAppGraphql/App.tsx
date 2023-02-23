import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {Todos} from './src/Todos';
import {IEdgeType, IPaginatedType, ResponseTodo} from './src/types';
import {TextCenter} from './src/shared-components';

const client = new ApolloClient({
  uri: 'http://10.0.2.2:3024/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          queryCursorBasedPaginated: {
            // keyArgs array, which contains the names
            // of all arguments that the cache should include in its storage keys
            // don't include limit, prevPageCursor and nextPageCursor
            keyArgs: false,
            merge(
              existing: IPaginatedType<ResponseTodo> | undefined,
              incoming: IPaginatedType<ResponseTodo>,
              {args, readField},
            ) {
              const {nextPageCursor} = args;

              const merged = existing ? existing.edges.slice(0) : [];
              let offset = offsetFromCursor(merged, nextPageCursor, readField);
              // If we couldn't find the cursor, default to appending to
              // the end of the list, so we don't lose any data.
              if (offset < 0) offset = merged.length;
              // Now that we have a reliable offset, the rest of this logic
              // is the same as in offsetLimitPagination.
              for (let i = 0; i < incoming.edges.length; ++i) {
                merged[offset + i] = incoming.edges[i];
              }
              return {
                edges: merged,
                pageInfo: incoming.pageInfo,
              };
            },

            // If you always want to return the whole list, you can omit
            // this read function.
            // weird somehow nextPageCursor is undefined
            // dispite the fact that we are setting it in fetchMore
          },
        },
      },
    },
  }),
});

function offsetFromCursor(
  items: IEdgeType<ResponseTodo>[],
  cursor: string,
  readField: Function,
) {
  // Search from the back of the list because the cursor we're
  // looking for is typically the ID of the last item.

  for (let i = items.length - 1; i >= 0; --i) {
    const item = items[i];

    // Using readField works for both non-normalized objects
    // (returning item.id) and normalized references (returning
    // the id field from the referenced entity object), so it's
    // a good idea to use readField when you're not sure what
    // kind of elements you're dealing with.

    if (readField('cursor', item) === cursor) {
      // Add one because the cursor identifies the item just
      // before the first item in the page we care about.
      return i + 1;
    }
  }

  // Report that the cursor could not be found.
  return -1;
}

const RootComponent = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={{...appStyles.container, ...backgroundStyle}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Todos />
    </SafeAreaView>
  );
};

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <RootComponent />
    </ApolloProvider>
  );
}

export default App;

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
