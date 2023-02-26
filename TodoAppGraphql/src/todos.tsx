import {useMutation, useQuery} from '@apollo/client';
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {REMOVE_TODO, TODOS_QUERY, TODOS_QUERY_TYPE} from './queries';
import {TextCenter} from './shared-components';
import {ResponseTodo} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EditTodo} from './edit-todo';
import {ButtonAction} from './shared';
import {StyleProp} from 'react-native';

const Stack = createNativeStackNavigator();
export const TodosContainer = () => {
  return (
    <Stack.Navigator
      initialRouteName="todos"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="todos" component={Todos} />
      <Stack.Screen
        name="todo_edit"
        component={EditTodo}
        options={() => ({title: 'Edit todo'})}
      />
    </Stack.Navigator>
  );
};

export const Todos = ({
  navigation: navigation,
}: {
  navigation: NavigationProp<any, any>;
}) => {
  const {loading, error, data, fetchMore} = useQuery<TODOS_QUERY_TYPE>(
    TODOS_QUERY,
    {
      variables: {
        limit: 5,
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

  const {queryCursorBasedPaginated} = data;
  const {edges} = queryCursorBasedPaginated;
  const {pageInfo} = queryCursorBasedPaginated;

  return (
    <View style={todoStyles.todoContainer}>
      <TextCenter style={todoStyles.todoTitle}>Todos</TextCenter>

      <FlatList
        data={edges}
        renderItem={({item, index}) => {
          const renderedTodoItem = (
            <TodoItem item={item.node} navigation={navigation} />
          );

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
                <Text style={todoStyles.fetchMoreText}>Load more</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={item => item.node.id}
      />
    </View>
  );
};

type ItemProps = {item: ResponseTodo; navigation: NavigationProp<any, any>};

const TodoItem = ({item, navigation}: ItemProps) => {
  const [mutateFunction, {loading}] = useMutation(REMOVE_TODO, {
    refetchQueries: [{query: TODOS_QUERY, variables: {limit: 5}}],
  });

  const todoNameStyles: StyleProp<TextStyle> = {
    textDecorationLine: item.isDone ? 'line-through' : 'none',
    textDecorationStyle: 'solid',
  };

  return (
    <View style={todoStyles.item}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('todo_edit', {
            todoId: item.id,
          });
        }}>
        <Text style={todoNameStyles}>{item.name}</Text>
        <Text style={{fontWeight: 'bold'}}>#{item.tag}</Text>
      </TouchableOpacity>

      {!loading ? (
        <ButtonAction
          onPress={() => {
            mutateFunction({variables: {removeTodoId: item.id}});
          }}
          text="Remove"
        />
      ) : (
        <Text>Loading ...</Text>
      )}
    </View>
  );
};

export const todoStyles = StyleSheet.create({
  todoContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
    color: 'black',
    backgroundColor: 'white',
  },

  todoTitle: {
    fontSize: 42,
  },

  item: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 8,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  touchableFetchMore: {
    marginTop: 16,
    marginBottom: 80,
    padding: 16,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
  },

  fetchMoreText: {
    textAlign: 'center',
  },
});
