import {EditTodo} from './edit-todo';
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import renderer from 'react-test-renderer';

describe('EditTodo', () => {
  let navigation: NavigationProp<any, any>;

  beforeEach(() => {
    navigation = {navigate: jest.fn()} as any;
  });

  it('should render the component', () => {
    const wrapper = renderer
      .create(<EditTodo navigation={navigation} />)
      .toJSON();

    expect(wrapper).toMatchInlineSnapshot();
  });
});
