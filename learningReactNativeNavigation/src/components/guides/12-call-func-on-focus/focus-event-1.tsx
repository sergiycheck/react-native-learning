import * as React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {
  NavigationContainer,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationType} from '../../shared/types';
import {createStackNavigator} from '@react-navigation/stack';
import {EmptyScreen} from '../../shared/empty-screen';
import {Button} from 'react-native-paper';

// with focus event
function ProfileScreenWithFocus(props: {
  navigation: NavigationType;
  route: {name: string};
}) {
  const {navigation} = props;
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Alert.alert('Screen is focused');
      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <EmptyScreen {...props} />

      <Button
        mode="contained"
        onPress={() => props.navigation.goBack()}
        style={styles.button}>
        go back
      </Button>
    </View>
  );
}

function ProfileScreenWithFocusEffect(props: {
  navigation: NavigationType;
  route: {name: string};
}) {
  useFocusEffect(
    React.useCallback(() => {
      Alert.alert('Screen was focused');
      // Do something when the screen is focused
      return () => {
        Alert.alert('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );

  return (
    <View>
      <EmptyScreen {...props} />

      <Button
        mode="contained"
        onPress={() => props.navigation.goBack()}
        style={styles.button}>
        go back
      </Button>
    </View>
  );
}

function ProfileScreenWithIsFocused(props: {
  navigation: NavigationType;
  route: {name: string};
}) {
  // This hook returns `true` if the screen is focused, `false` otherwise
  const isFocused = useIsFocused();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{isFocused ? 'focused' : 'unfocused'}</Text>
      <EmptyScreen {...props} />

      <Button
        mode="contained"
        onPress={() => props.navigation.goBack()}
        style={styles.button}>
        go back
      </Button>
    </View>
  );
}

function ProfileHome(props: {
  navigation: NavigationType;
  route: {name: string};
}) {
  return (
    <View style={styles.profileHome}>
      <Button
        mode="contained"
        onPress={() => props.navigation.navigate('ProfileScreenWithFocus')}
        style={styles.button}>
        ProfileScreenWithFocus
      </Button>
      <Button
        mode="contained"
        onPress={() =>
          props.navigation.navigate('ProfileScreenWithFocusEffect')
        }
        style={styles.button}>
        ProfileScreenWithFocusEffect
      </Button>
      <Button
        mode="contained"
        onPress={() => props.navigation.navigate('ProfileScreenWithIsFocused')}
        style={styles.button}>
        ProfileScreenWithIsFocused
      </Button>
    </View>
  );
}

const Stack = createStackNavigator();

function ProfileScreen() {
  return (
    <Stack.Navigator initialRouteName="ProfileHome">
      <Stack.Screen name="ProfileHome" component={ProfileHome} />
      <Stack.Screen
        name="ProfileScreenWithFocus"
        component={ProfileScreenWithFocus}
      />
      <Stack.Screen
        name="ProfileScreenWithFocusEffect"
        component={ProfileScreenWithFocusEffect}
      />
      <Stack.Screen
        name="ProfileScreenWithIsFocused"
        component={ProfileScreenWithIsFocused}
      />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  return <View />;
}

const Tab = createBottomTabNavigator();

export function CallFuncWithFocusEvent1() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  profileHome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 8,
  },
});
