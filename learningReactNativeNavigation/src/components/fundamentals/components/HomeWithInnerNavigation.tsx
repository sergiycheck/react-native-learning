import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button, Text, View} from 'react-native';
const Tab = createBottomTabNavigator();

export function HomeWithInnerTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={innerRoutes.Feed} component={FeedScreen} />
      <Tab.Screen name={innerRoutes.Messages} component={MessagesScreen} />
    </Tab.Navigator>
  );
}

export const innerRoutes = {
  Feed: 'Feed',
  Messages: 'Messages',
};

function FeedScreen({navigation}: any) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>FeedScreen!</Text>
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function MessagesScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>MessagesScreen!</Text>
    </View>
  );
}
