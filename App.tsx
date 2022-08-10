import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./components/home/Home";
import { ProfileScreen } from "./components/profile/Profile";
import PizzaTranslator from "./components/pizza-translator/PizzaTranslator";
import ScrollViewComponent from "./components/scroll-view/ScrollViewComponent";
import FlatListBasics from "./components/using-list-view/FlatListBasics";
import SectionListBasics from "./components/using-list-view/SectionListBasics";
import LotsOfStyles from "./components/design/style/LotsOfStyles";
import FixedDimensionsBasics from "./components/design/height-width/FixedDimensionsBasics";
import FlexDimensionsBasicsFlex from "./components/design/height-width/FixedDimensionsBasicsFlex";
import PercentageDimensionsBasics from "./components/design/height-width/PercentageDimensionsBasics";
import FlexBasicLayout from "./components/design/layout-flexbox/BasicLayoutFlexbox";
import FlexDirectionsLayout from "./components/design/layout-flexbox/FlexDirectionsLayout";

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
        <Stack.Screen name="LotsOfStyles" component={LotsOfStyles} />
        <Stack.Screen
          name="FixedDimensionsBasics"
          component={FixedDimensionsBasics}
        />
        <Stack.Screen
          name="FlexDimensionsBasicsFlex"
          component={FlexDimensionsBasicsFlex}
        />
        <Stack.Screen
          name="PercentageDimensionsBasics"
          component={PercentageDimensionsBasics}
        />
        <Stack.Screen name="FlexBasicLayout" component={FlexBasicLayout} />
        <Stack.Screen
          name="FlexDirectionsLayout"
          component={FlexDirectionsLayout}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
