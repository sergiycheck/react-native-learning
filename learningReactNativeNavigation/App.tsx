import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from './src/routes';
import {Home} from './src/components/Home';
import {Other} from './src/components/Other';
import {ProfileScreen} from './src/components/ProfileScreen';
import {LogoTitle} from './src/components/shared/Logotitle';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={routes.home}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#bdffde',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name={routes.home}
          component={Home}
          options={{
            title: 'Overview',
            headerTitle: props => <LogoTitle {...props} />,
          }}
        />
        <Stack.Screen
          name={routes.other}
          component={Other}
          options={{title: 'other'}}
        />
        <Stack.Screen
          name={routes.profile}
          component={ProfileScreen}
          options={({route}: {route: any}) => ({
            title: route?.params?.name,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
