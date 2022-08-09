import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Separator } from "../sharedComponents";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  btn: {
    marginTop: 2,
  },
});

export const ComponentWithTextAndPicture = () => {
  return (
    <View>
      <Text>Some title</Text>

      <Text
        style={{ color: "blue" }}
        onPress={() =>
          Linking.openURL(
            "https://wix.github.io/react-native-navigation/docs/before-you-start/"
          )
        }
      >
        React native navigation library docs
      </Text>
      <Text
        style={{ color: "blue" }}
        onPress={() =>
          Linking.openURL(
            "https://reactnavigation.org/docs/hello-react-navigation"
          )
        }
      >
        React navigation library
      </Text>
      <View>
        <Text>Title of the image</Text>
        <Image
          source={{
            uri: "https://reactnative.dev/docs/assets/p_cat2.png",
          }}
          style={styles.image}
        ></Image>
        <StatusBar style="auto" />
      </View>
      <TextInput style={styles.textInput}></TextInput>
    </View>
  );
};

export const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <ComponentWithTextAndPicture />
        <Separator />

        <Button
          title="Go to Jane's profile"
          onPress={() => navigation.navigate("Profile", { name: "Jane" })}
        />
        <Separator />
        <Button
          title="Pizza translators"
          onPress={() =>
            navigation.navigate("PizzaTranslator", { name: "Translator name" })
          }
        />
        <Separator />
        <Button
          title="ScrollViewComponent"
          onPress={() => navigation.navigate("ScrollViewComponent")}
        />

        <Separator />
        <Button
          title="FlatListBasics"
          onPress={() => navigation.navigate("FlatListBasics")}
        />

        <Separator />
        <Button
          title="SectionListBasics"
          onPress={() => navigation.navigate("SectionListBasics")}
        />
      </View>
    </ScrollView>
  );
};
