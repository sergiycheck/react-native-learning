import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {FocusAwareStatusBar} from './focus-aware-status-bar';

// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationType} from '../../shared/types';
// browse all
//https://oblador.github.io/react-native-vector-icons/

function Screen1({navigation}: {navigation: NavigationType}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: '#6a51ae',
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Text style={{color: '#fff'}}>Light Screen</Text>
      <Button
        title="Next screen"
        onPress={() => navigation.navigate('Screen2')}
        color="#000000"
      />

      {/* <Button
        title="toggle drawer"
        onPress={() => navigation.toggleDrawer()}
        color="#000000"
      /> */}
    </View>
  );
}

function Screen2({navigation}: {navigation: NavigationType}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: '#ecf0f1',
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Text>Dark Screen</Text>
      <Button
        title="Next screen"
        onPress={() => navigation.navigate('Screen1')}
      />

      {/* <Button
        title="toggle drawer"
        onPress={() => navigation.toggleDrawer()}
        color="#000000"
      /> */}
    </View>
  );
}

// const Stack = createNativeStackNavigator();

// export function DiffStatusBar2() {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{headerShown: false}}>
//           <Stack.Screen name="Screen1" component={Screen1} />
//           <Stack.Screen name="Screen2" component={Screen2} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

const Tab = createBottomTabNavigator();

export function DiffStatusBar2() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: props => {
              let iconName = '';
              if (route.name === 'Screen1') {
                iconName = 'ios-hammer-outline';
              } else if (route.name === 'Screen2') {
                iconName = 'ios-trending-down-sharp';
              }

              return (
                <Ionicons
                  name={iconName}
                  size={props.size}
                  color={props.color}
                />
              );
            },
            headerShown: false,
          })}>
          <Tab.Screen name="Screen1" component={Screen1} />
          <Tab.Screen name="Screen2" component={Screen2} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// const Drawer = createDrawerNavigator();

// export function DiffStatusBar2() {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <Drawer.Navigator
//           useLegacyImplementation
//           screenOptions={{headerShown: false}}
//           initialRouteName="Screen1">
//           <Drawer.Screen name="Screen1" component={Screen1} />
//           <Drawer.Screen name="Screen2" component={Screen2} />
//         </Drawer.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
