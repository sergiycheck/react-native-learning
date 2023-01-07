import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from './src/routes';
import {Home} from './src/components/Home';
import {Other} from './src/components/Other';
import {ProfileScreen} from './src/components/ProfileScreen';
import {LogoTitle} from './src/components/shared/Logotitle';
import {Button} from 'react-native';
import {HomeScreenUpdateCount} from './src/components/HomeUpdateCount';
import {HomeWithInnerTabs} from './src/components/HomeWithInnerNavigation';
import {AppWithNestedDrawler} from './src/components/NavigatingToNestedComponent';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
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

export default App;
