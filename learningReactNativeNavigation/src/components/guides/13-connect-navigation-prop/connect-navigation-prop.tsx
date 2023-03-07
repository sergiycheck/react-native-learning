import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationType} from '../../shared/types';

function GoToButton({screenName}: {screenName: string}) {
  const navigation = useNavigation();

  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName as never)}
    />
  );
}

function HomeScreen({navigation}: {navigation: NavigationType}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <GoToButton screenName="Details" />
    </View>
  );
}

function DetailsScreen({navigation}: {navigation: NavigationType}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>

      <GoToButton screenName="Home" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export function ConnectNavigationProp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
