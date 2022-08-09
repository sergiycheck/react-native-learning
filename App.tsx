import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./components/home/Home";
import { ProfileScreen } from "./components/profile/Profile";
import PizzaTranslator from "./components/pizza-translator/PizzaTranslator";
import ScrollViewComponent from "./components/scroll-view/ScrollViewComponent";
import FlatListBasics from "./components/using-list-view/FlatListBasics";
import SectionListBasics from "./components/using-list-view/SectionListBasics";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="PizzaTranslator" component={PizzaTranslator} />
        <Stack.Screen
          name="ScrollViewComponent"
          component={ScrollViewComponent}
        />

        <Stack.Screen name="FlatListBasics" component={FlatListBasics} />
        <Stack.Screen name="SectionListBasics" component={SectionListBasics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
