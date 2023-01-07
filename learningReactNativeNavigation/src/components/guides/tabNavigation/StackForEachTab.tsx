import * as React from 'react';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {Button, Dimensions, Image, Text, View, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Separator} from '../../shared/Separator';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  titleText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

function DetailsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.titleText}>Remember!</Text>
      <Separator />
      <Text style={styles.titleText}>Embrace masculinity!</Text>
      <Separator />
      <Text style={styles.titleText}>What color is your bugatti!</Text>
      <Separator />
      <Text style={styles.titleText}>
        Do the impossible and you'll never doubt yourself ever again.
      </Text>
    </View>
  );
}

function HomeScreen({navigation}: {navigation: NavigationProp<any, any>}) {
  const imageUri =
    'https://i.guim.co.uk/img/media/59c1b14b1677cc33e27967cf6b11c8fd99a93761/0_102_1080_648/master/1080.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=6acd9946cd3344786ad2485e3a10b585';

  const [sizes, setSizes] = React.useState({width: 0, height: 0});
  React.useEffect(() => {
    Image.getSize(imageUri, (width, height) => {
      const screeenWidth = Dimensions.get('window').width;
      const scale = width / screeenWidth;
      const imageHeight = height / scale;
      setSizes(() => ({width: screeenWidth, height: imageHeight}));
    });
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{width: sizes.width, height: sizes.height}}
        source={{uri: imageUri}}
      />
      <Text>Cobra Tate</Text>
      <Separator />
      <Button
        title="Boost yourself"
        onPress={() => navigation.navigate('Quotes')}
      />
    </View>
  );
}

function SettingDetails() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.titleText}>setting details!</Text>
    </View>
  );
}

function SettingsScreen({navigation}: {navigation: NavigationProp<any, any>}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Boost yourself" component={HomeScreen} />
      <HomeStack.Screen name="Quotes" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="HomeSettings" component={SettingsScreen} />
      <SettingsStack.Screen name="SettingDetails" component={SettingDetails} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App_StackForEachTab() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = '';

            if (route.name === 'Home') {
              iconName = focused ? 'man' : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
