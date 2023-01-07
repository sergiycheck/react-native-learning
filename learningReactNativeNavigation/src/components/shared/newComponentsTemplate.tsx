import React from 'react';
import {NavigationProp} from '@react-navigation/native';

import {View, Text, Button} from 'react-native';

export const NewComponentTemplate = ({
  navigation,
}: {
  navigation: NavigationProp<any, any> | any;
}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>FeedScreen!</Text>
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
};
