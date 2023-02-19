import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextCenter} from './shared-components';
import {IPaginatedType, ResponseTodo} from './types';

const TODOS_QUERY = gql`
  query QueryCursorBasedPaginated(
    $limit: Int!
    $previousPageCursor: String
    $nextPageCursor: String
  ) {
    queryCursorBasedPaginated(
      limit: $limit
      previousPageCursor: $previousPageCursor
      nextPageCursor: $nextPageCursor
    ) {
      edges {
        node {
          id
          createdAt
          isDone
          name
          tag
          updatedAt
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

type TODOS_QUERY_TYPE = {
  queryCursorBasedPaginated: IPaginatedType<ResponseTodo>;
};

export const Todos = () => {
  const {loading, error, data, fetchMore} = useQuery<TODOS_QUERY_TYPE>(
    TODOS_QUERY,
    {
      variables: {
        limit: 3,
      },
    },
  );

  if (loading || !data)
    return (
      <View>
        <ActivityIndicator animating={true} />
      </View>
    );

  if (error)
    return (
      <View>
        <TextCenter>Failed to load data!</TextCenter>
      </View>
    );

  console.log('data', data);

  const {queryCursorBasedPaginated} = data;
  const {edges} = queryCursorBasedPaginated;
  const {pageInfo} = queryCursorBasedPaginated;

  return (
    <View style={todoStyles.todoContainer}>
      <TextCenter>Todos list</TextCenter>
      <TouchableOpacity
        style={todoStyles.touchableFetchMore}
        disabled={!pageInfo.hasPreviousPage}
        onPress={() => {
          fetchMore({
            variables: {
              limit: 3,
              previousPageCursor: pageInfo.startCursor,
            },
          });
        }}>
        <Text>Load back</Text>
      </TouchableOpacity>
      <FlatList
        data={edges}
        renderItem={({item, index}) => {
          const renderedTodoItem = <TodoItem title={item.node.name} />;

          return index < edges.length - 1 ? (
            renderedTodoItem
          ) : (
            <View>
              {renderedTodoItem}
              <TouchableOpacity
                style={todoStyles.touchableFetchMore}
                disabled={!pageInfo.hasNextPage}
                onPress={() => {
                  const {endCursor} = pageInfo;
                  fetchMore({
                    variables: {
                      limit: 3,
                      nextPageCursor: endCursor,
                    },
                  });
                }}>
                <Text>Load more</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={item => item.node.id}
      />
    </View>
  );
};

type ItemProps = {title: string};

const TodoItem = ({title}: ItemProps) => (
  <Text style={todoStyles.item}>{title}</Text>
);

export const todoStyles = StyleSheet.create({
  todoContainer: {
    marginHorizontal: 16,
  },
  item: {
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    backgroundColor:
      'linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))',
    marginVertical: 8,
    color: '#FFF',
  },

  touchableFetchMore: {
    marginTop: 16,
    marginBottom: 26,
    padding: 16,
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor:
      'linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))',
  },
});
