import * as React from 'react';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {Button, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import {useDrawerStatus} from '@react-navigation/drawer';
import {Separator} from '../../shared/Separator';

function HomeScreen({navigation}: {navigation: NavigationProp<any, any>}) {
  const isDrawerOpen = useDrawerStatus() === 'open';

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{isDrawerOpen ? 'drawer is opened' : 'drawer is closed'}</Text>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
      <Separator />
      <Button
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        title="Open drawer"
      />
      <Separator />

      <Button
        onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
        title="Close drawer"
      />
      <Separator />

      <Button
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        title="Toggle drawer"
      />
      <Separator />
    </View>
  );
}

function NotificationsScreen({
  navigation,
}: {
  navigation: NavigationProp<any, any>;
}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Notifications</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export function DrawerNavigationMinimal() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
