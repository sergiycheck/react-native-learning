import * as React from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {useTheme} from '@react-navigation/native';
import {useCardAnimation} from '@react-navigation/stack';

function HomeScreen({navigation}: {navigation: NavigationProp<any, any>}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={{fontSize: 30}}>This is the home screen!</Text>
      <Button
        onPress={() => navigation.navigate('MyModal')}
        title="Open Modal"
      />
    </View>
  );
}

// function ModalScreen({navigation}: {navigation: NavigationProp<any, any>}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text style={{fontSize: 30}}>This is a modal!</Text>
//       <Button onPress={() => navigation.goBack()} title="Dismiss" />
//     </View>
//   );
// }

function ModalScreen({navigation}: {navigation: NavigationProp<any, any>}) {
  const {colors} = useTheme();
  const {current} = useCardAnimation();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
        ]}
        onPress={navigation.goBack}
      />
      <Animated.View
        style={{
          padding: 16,
          width: '90%',
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: colors.card,
          transform: [
            {
              scale: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <Text>
          Mise en place is a French term that literally means “put in place.” It
          also refers to a way cooks in professional kitchens and restaurants
          set up their work stations—first by gathering all ingredients for a
          recipes, partially preparing them (like measuring out and chopping),
          and setting them all near each other. Setting up mise en place before
          cooking is another top tip for home cooks, as it seriously helps with
          organization. It’ll pretty much guarantee you never forget to add an
          ingredient and save you time from running back and forth from the
          pantry ten times.
        </Text>
        <Button
          title="Okay"
          color={colors.primary}
          style={{alignSelf: 'flex-end'}}
          onPress={navigation.goBack}
        />
      </Animated.View>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View>
      <Text>Details</Text>
    </View>
  );
}

const RootStack = createStackNavigator();

export function OpeningAModal1() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Details" component={DetailsScreen} />
        </RootStack.Group>
        <RootStack.Group
          screenOptions={{presentation: 'modal', headerShown: false}}>
          <RootStack.Screen name="MyModal" component={ModalScreen} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
