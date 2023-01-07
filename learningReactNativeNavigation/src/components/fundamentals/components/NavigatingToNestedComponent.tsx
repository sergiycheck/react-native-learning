import React from 'react';

import {
  Button,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Separator} from '../../shared/Separator';

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
      <Separator />
      <Button
        title="Root nested Profile"
        onPress={() =>
          navigation.navigate(RoutesNested.root_nested.name, {
            screen: RoutesNested.root_nested.nested_screens.profile_nested,
          })
        }
      />
      <Separator />
      <Button
        title="Root nested Settings"
        onPress={() =>
          navigation.navigate(RoutesNested.root_nested.name, {
            screen: RoutesNested.root_nested.nested_screens.settings_nested,
            initial: false,
          })
        }
      />
    </View>
  );
}

function HomeNestedScreen({navigation}: any) {
  return (
    <View style={styles.centerTextContent}>
      <Text>home nested screen !</Text>
      <Separator />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Linking.openURL(
            'https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/',
          );
        }}>
        <Text>Rect native reanimated</Text>
      </TouchableOpacity>
      <Separator />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Linking.openURL(
            'https://docs.swmansion.com/react-native-gesture-handler/docs/installation',
          );
        }}>
        <Text>Rect native gesture handler</Text>
      </TouchableOpacity>
      <Separator />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
      <Separator />
      <Button
        title="Feed nested"
        onPress={() => navigation.navigate(RoutesNested.feed_nested)}
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
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
