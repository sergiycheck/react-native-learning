import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from './src/routes';
import {Home} from './src/components/Home';
import {Other} from './src/components/Other';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.home}>
        <Stack.Screen
          name={routes.home}
          component={Home}
          options={{title: 'Overview'}}
        />
        <Stack.Screen
          name={routes.other}
          component={Other}
          options={{title: 'other'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
