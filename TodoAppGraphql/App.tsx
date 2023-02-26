import React from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {IEdgeType, IPaginatedType, ResponseTodo} from './src/types';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@rneui/themed';

import {TodosContainer} from './src/todos';
import {AddTodoScreen} from './src/add-todo';
import {TODOS_QUERY, TODOS_QUERY_TYPE} from './src/queries';

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
              const {nextPageCursor} = args as {nextPageCursor: string};

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

  resolvers: {
    Query: {
      todo: (_root, args: {todoId: string}, {cache}) => {
        const {todoId} = args;
        const {queryCursorBasedPaginated} = cache.readQuery({
          query: TODOS_QUERY,
        }) as TODOS_QUERY_TYPE;

        const {edges} = queryCursorBasedPaginated;

        const todoIndex = edges.findIndex(item => item.cursor === todoId);
        if (todoIndex) {
          const todoEdge = edges[todoIndex];
          let prevCursor = todoEdge.cursor;
          if (todoIndex > 0) {
            prevCursor = edges[todoIndex - 1].cursor;
          }

          return {
            todo: todoEdge.node,
            prevCursor,
          };
        }
      },
    },
  },
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

const Tab = createBottomTabNavigator();

const RootComponent = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const modeStyles = {
    backgroundColor: isDarkMode ? 'black' : 'white',
    color: isDarkMode ? 'white' : 'black',
  };

  const stylesToPass = {
    ...appStyles.container,
    ...modeStyles,
  };

  return (
    <SafeAreaProvider style={{...stylesToPass}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={modeStyles.backgroundColor}
      />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = '';

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home-filled' : 'home';
                break;

              case 'AddTodo':
                iconName = focused ? 'add-circle' : 'add-circle-outline';
                break;
              default:
                iconName = focused ? 'home-filled' : 'home';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={TodosContainer} />
        <Tab.Screen name="AddTodo" component={AddTodoScreen} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <RootComponent />
      </ApolloProvider>
    </NavigationContainer>
  );
}

export default App;

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
