import * as React from 'react';
import {NavigationContainer, Route} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EmptyScreen} from '../../shared/empty-screen';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export function getHeaderTitle(
  route: Partial<Route<string, object | undefined>>,
) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'Feed':
      return 'News feed';
    case 'Profile':
      return 'My profile';
    case 'Account':
      return 'My account';
  }
}

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

function A(props: any) {
  return <EmptyScreen {...props} />;
}

function B(props: any) {
  return <EmptyScreen {...props} />;
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen
        name="A"
        component={A}
        options={{tabBarLabel: 'Home!'}}
      />
    </HomeStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{headerShown: false}}>
      <SettingsStack.Screen
        name="B"
        component={B}
        options={{tabBarLabel: 'Settings!'}}
      />
    </SettingsStack.Navigator>
  );
}

export function ScreensOptsWithNestedNavs1() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: true}}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={({route}) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={{tabBarLabel: 'Settings!'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
