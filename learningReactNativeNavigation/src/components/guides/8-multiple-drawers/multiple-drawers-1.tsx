import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationType} from '../../shared/types';

function HomeScreen({navigation}: {navigation: NavigationType}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.openDrawer()}
        title="Open left drawer"
      />
      <Button
        onPress={() => (navigation.getParent() as NavigationType).openDrawer()}
        title="Open right drawer"
      />
    </View>
  );
}

const LeftDrawer = createDrawerNavigator();

const LeftDrawerScreen = () => {
  return (
    <LeftDrawer.Navigator screenOptions={{drawerPosition: 'left'}}>
      <LeftDrawer.Screen name="Home" component={HomeScreen} />
    </LeftDrawer.Navigator>
  );
};

const RightDrawer = createDrawerNavigator();

const RightDrawerScreen = () => {
  return (
    <RightDrawer.Navigator
      screenOptions={{drawerPosition: 'right', headerShown: false}}>
      <RightDrawer.Screen name="HomeDrawer" component={LeftDrawerScreen} />
    </RightDrawer.Navigator>
  );
};

export function MultipleDrawers1() {
  return (
    <NavigationContainer>
      <RightDrawerScreen />
    </NavigationContainer>
  );
}
