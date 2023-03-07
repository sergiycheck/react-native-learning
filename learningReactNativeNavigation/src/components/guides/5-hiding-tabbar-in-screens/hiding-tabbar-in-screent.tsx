import * as React from 'react';
import {Text, View, Button} from 'react-native';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function EmptyScreen({route}: {route: {name: string}}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{route.name}</Text>
    </View>
  );
}

function Home({navigation}: {navigation: NavigationProp<any, any>}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home_Tab"
      screenOptions={() => ({
        headerShown: true,
      })}>
      <Tab.Screen name="Home_Tab" component={Home} />
      <Tab.Screen name="Feed" component={EmptyScreen} />
      <Tab.Screen name="Notifications" component={EmptyScreen} />
    </Tab.Navigator>
  );
}

export function HidingTabBarInScreens() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home_Stack"
        screenOptions={({route}) => ({
          headerShown: route.name === 'Home_Stack' ? false : true,
        })}>
        <Stack.Screen name="Home_Stack" component={HomeTabs} />
        <Stack.Screen name="Profile" component={EmptyScreen} />
        <Stack.Screen name="Settings" component={EmptyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
