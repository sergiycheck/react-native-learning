import React from 'react';

import {Button, ScrollView, Text} from 'react-native';

export const ProfileScreen = ({navigation}: any) => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Text>profile</Text>

      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({title: 'Updated!'})}
      />
    </ScrollView>
  );
};
