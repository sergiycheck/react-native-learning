import * as React from 'react';
import {View, Button} from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  Route,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EmptyScreen} from '../../shared/empty-screen';
import {NavigationType} from '../../shared/types';

function getHeaderTitle(route: Partial<Route<string, object | undefined>>) {
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

function FeedScreen({navigation}: {navigation: NavigationType}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

function ProfileScreen(props: any) {
  return <EmptyScreen {...props} />;
}

function AccountScreen(props: any) {
  return <EmptyScreen {...props} />;
}

function SettingsScreen(props: any) {
  return <EmptyScreen {...props} />;
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export function ScreenOptionsWithNestedNav2() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={({route}) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
