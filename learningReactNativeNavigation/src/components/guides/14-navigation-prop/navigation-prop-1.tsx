import * as React from 'react';
import {View, Button, Text} from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteType} from '../../shared/types';

const navigationRef = createNavigationContainerRef();

function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

function Home() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="Go to Settings"
        onPress={() => navigate('Settings', {userName: 'Lucy'})}
      />
    </View>
  );
}

function Settings({route}: {route: RouteType}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Hello {route?.params?.userName}</Text>
      <Button title="Go to Home" onPress={() => navigate('Home')} />
    </View>
  );
}

const RootStack = createNativeStackNavigator();

export function NavigationWithoutNavigationProp1() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Settings" component={Settings} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
