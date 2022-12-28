import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailsScreen } from "./src/components/Details";
import { HomeScreen } from "./src/components/Home";
import { CreatePostScreen, PostsScreen } from "./src/components/Posts";
import { Routes } from "./src/Routes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.Home}>
        <Stack.Screen
          name={Routes.Home}
          component={HomeScreen}
          options={{ title: "Overview" }}
        />
        <Stack.Screen
          name={Routes.Details}
          component={DetailsScreen}
          initialParams={{ itemId: 42 }}
        />
        <Stack.Screen name={Routes.Posts} component={PostsScreen} />
        <Stack.Screen name={Routes.CreatePost} component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
