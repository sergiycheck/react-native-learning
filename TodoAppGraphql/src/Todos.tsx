import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TextCenter} from './shared-components';
import {IPaginatedType, ResponseTodo} from './types';

const todosData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const TODOS_QUERY = gql`
  query TodosPaginated(
    $limit: Int!
    $previousPageCursor: String
    $nextPageCursor: String
  ) {
    queryCursorBasedPaginated(
      limit: $limit
      previousPageCursor: $previousPageCursor
      nextPageCursor: $nextPageCursor
    ) {
      pageInfo {
        previousPageCursor
        nextPageCursor
        hasPrevPage
        hasNextPage
      }
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
        previousPageCursor: null,
        nextPageCursor: null,
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

  return (
    <View style={todoStyles.todoContainer}>
      <TextCenter>Todos list</TextCenter>
      <FlatList
        data={edges}
        renderItem={({item}) => <TodoItem title={item.node.name} />}
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    backgroundColor: '#f9c2ff',
    marginVertical: 8,
    color: '#FFF',
  },
});
