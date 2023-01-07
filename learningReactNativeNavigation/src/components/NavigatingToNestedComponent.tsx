import React from 'react';

import {Button, StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export const RoutesNested = {
  root_nested: {
    name: 'root_nested',
    nested_screens: {
      home_nested: 'home_nested',
      profile_nested: 'profile_nested',
      settings_nested: 'settings_nested',
    },
  },
  feed_nested: 'feed_nested',
};

const Stack = createNativeStackNavigator();
export function AppWithNestedDrawler() {
  return (
    <Stack.Navigator initialRouteName={RoutesNested.root_nested.name}>
      <Stack.Screen
        name={RoutesNested.root_nested.name}
        component={Root}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RoutesNested.feed_nested}
        component={FeedNestedScreen}
      />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();
function Root() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={RoutesNested.root_nested.nested_screens.home_nested}
        component={HomeNestedScreen}
      />
      <Drawer.Screen
        name={RoutesNested.root_nested.nested_screens.profile_nested}
        component={ProfileNestedScreen}
      />
      <Stack.Screen
        name={RoutesNested.root_nested.nested_screens.settings_nested}
        component={SettingsNestedScreen}
      />
    </Drawer.Navigator>
  );
}

function FeedNestedScreen({navigation}: any) {
  return (
    <View style={styles.centerTextContent}>
      <Text>feed nested screen !</Text>
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function HomeNestedScreen({navigation}: any) {
  return (
    <View style={styles.centerTextContent}>
      <Text>home nested screen !</Text>
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function ProfileNestedScreen() {
  return (
    <View style={styles.centerTextContent}>
      <Text>profile nested screen !</Text>
    </View>
  );
}

function SettingsNestedScreen() {
  return (
    <View style={styles.centerTextContent}>
      <Text>settings nested screen !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerTextContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
