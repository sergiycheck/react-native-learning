import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {NavigationProp} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';

import {
  EDIT_TODO,
  GET_TODO_BY_ID_LOCAL,
  GET_TODO_BY_ID_LOCAL_TYPE,
  TODOS_QUERY,
} from './queries';
import {ButtonAction, StyledCheckBox, StyledTextInput} from './shared';

export function EditTodo({
  route,
  navigation,
}: {
  route: any;
  navigation: NavigationProp<any, any>;
}) {
  const {todoId} = route.params;

  const {data} = useQuery<GET_TODO_BY_ID_LOCAL_TYPE>(GET_TODO_BY_ID_LOCAL, {
    variables: {
      todoId,
    },
  });

  const todo = React.useMemo(() => {
    return data?.todo;
  }, [data]);

  const [newTodo, setNewTodo] = React.useState(todo?.name!);
  const [newTag, setNewTag] = React.useState(todo?.tag!);
  const [checked, setChecked] = React.useState(todo?.isDone!);

  React.useEffect(() => {
    if (todo) {
      if (todo.name) setNewTodo(() => todo.name);
      if (todo.tag) setNewTag(() => todo.tag!);
      if (todo.isDone) setChecked(() => todo.isDone!);
    }
  }, [todo]);

  const toggleCheckbox = () => setChecked(!checked);

  const [mutateFunction, {loading}] = useMutation(EDIT_TODO, {
    refetchQueries: [
      {
        query: TODOS_QUERY,
        variables: {limit: 5, nextPageCursor: data?.prevCursor},
      },
    ],
  });

  const submitHanler = () => {
    if (!newTodo || !newTag) return;

    mutateFunction({
      variables: {
        updateTodoInput: {
          id: todo?.id,
          name: newTodo,
          isDone: checked,
          tag: newTag,
        },
      },
    })
      .then(_result => {
        setNewTodo('');
        setNewTag('');
        setChecked(false);

        navigation.navigate('Home');
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <View style={styles.container}>
      <StyledTextInput
        value={newTodo}
        onChangeText={setNewTodo}
        placeholder="Edit todo"
      />

      <StyledTextInput
        value={newTag}
        onChangeText={setNewTag}
        placeholder="Tag"
      />

      <StyledCheckBox
        title="Done ?"
        checked={checked}
        onPress={toggleCheckbox}
      />

      <View style={styles.createContainer}>
        <ButtonAction
          onPress={() => {
            submitHanler();
          }}
          text="Update"
        />
      </View>

      <View>{loading && <Text>Updating...</Text>}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,

    color: 'black',
    backgroundColor: 'white',
  },

  createContainer: {
    flexDirection: 'column',
    alignContent: 'flex-end',
  },
});
