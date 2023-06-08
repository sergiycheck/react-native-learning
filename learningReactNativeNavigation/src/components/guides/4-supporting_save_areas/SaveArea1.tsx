import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// import {createNativeStackNavigator} from '@react-navigation/native-stack';

function Analitics({navigation}: {navigation: NavigationProp<any, any>}) {
  return (
    <SafeAreaWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>Analitics top text</Text>
        <Text>This is bottom text.</Text>
        <Button
          title="Profile"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    </SafeAreaWrapper>
  );
}

function Profile({navigation}: {navigation: NavigationProp<any, any>}) {
  return (
    <SafeAreaWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>Profile top text v1</Text>
        <Text>This is bottom text.</Text>
        <Button
          title="Analitics"
          onPress={() => navigation.navigate('Analitics')}
        />
      </View>
    </SafeAreaWrapper>
  );
}

// function Settings() {
//   return (
//     <View
//       style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
//       <Text>Settings top text</Text>
//       <Text>This is bottom text.</Text>
//     </View>
//   );
// }

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SafeAreaWrapper({children}: {children: JSX.Element}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      {children}
    </View>
  );
}

export function SupportingSaveArea1() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>


        <Stack.Screen name="Home">
          {() => (
  
          )}
        </Stack.Screen>

        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator> */}

        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName = (() => {
                switch (route.name) {
                  case 'Analitics':
                    return focused ? 'analytics' : 'analytics-outline';
                  case 'Profile':
                    return focused ? 'clipboard' : 'clipboard-outline';
                  default:
                    return 'Analitics';
                }
              })();

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}>
          <Tab.Screen name="Analitics" component={Analitics} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
