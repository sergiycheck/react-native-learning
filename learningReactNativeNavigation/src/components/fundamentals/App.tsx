import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from './routes';
import {Home} from './components/Home';
import {Other} from './components/Other';
import {ProfileScreen} from './components/ProfileScreen';
import {LogoTitle} from '../shared/Logotitle';
import {Button} from 'react-native';
import {HomeScreenUpdateCount} from './components/HomeUpdateCount';
import {HomeWithInnerTabs} from './components/HomeWithInnerNavigation';
import {AppWithNestedDrawler} from './components/NavigatingToNestedComponent';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export const AppFundamentals = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
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
              headerRight: () => (
                <Button
                  onPress={() => console.log('this is a button')}
                  title="Info"
                  color="#f194ff"
                />
              ),
            }}
          />

          <Stack.Screen
            name={routes.homeWithCount}
            component={HomeScreenUpdateCount}
            options={() => ({
              headerTitle: props => <LogoTitle {...props} />,
              // Add a placeholder button without the `onPress` to avoid flicker
              headerRight: () => <Button title="Update count" />,
            })}
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

          <Stack.Screen
            name={routes.HomeWithInnerTabs}
            component={HomeWithInnerTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={routes.AppWithNestedDrawler}
            component={AppWithNestedDrawler}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
