import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {NavigationProp} from '@react-navigation/native';
import {useMutation} from '@apollo/client';

import {CREATE_TODO, TODOS_QUERY} from './queries';
import {ButtonAction, StyledCheckBox, StyledTextInput} from './shared';

export function AddTodoScreen({
  navigation,
}: {
  navigation: NavigationProp<any, any>;
}) {
  const [newTodo, setNewTodo] = React.useState('');
  const [newTag, setNewTag] = React.useState('');

  const [checked, setChecked] = React.useState(true);
  const toggleCheckbox = () => setChecked(!checked);

  const [mutateFunction, {loading}] = useMutation(CREATE_TODO, {
    refetchQueries: [{query: TODOS_QUERY, variables: {limit: 5}}],
  });

  const submitHanler = () => {
    if (!newTodo || !newTag) return;

    mutateFunction({
      variables: {
        createTodoInput: {
          name: newTodo,
          tag: newTag,
          isDone: checked,
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
        placeholder="Add todo"
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
          text="Create"
        />
      </View>

      <View>{loading && <Text>Creating...</Text>}</View>
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
