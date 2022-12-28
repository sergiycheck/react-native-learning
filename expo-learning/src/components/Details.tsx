import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Routes } from "../Routes";
import { StatusBar } from "expo-status-bar";

type Params = {
  [key: string]: any;
};
type DetailsScreenProps = {
  route: {
    params: {
      itemId: number;
      otherParam: string;
    };
  };
  navigation: {
    push: (val: string, ...params: Params[]) => void;
    navigate: (val: string, ...params: Params[]) => void;
    goBack: () => void;
    popToTop: () => void;
  };
};

export function DetailsScreen({ route, navigation }: DetailsScreenProps) {
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>It is details page</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>

      <Button
        title="Go to details... again"
        onPress={() =>
          navigation.push(Routes.Details, {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />

      <Button
        title="Go to home"
        onPress={() => navigation.navigate(Routes.Home)}
      />

      <Button title="Go back" onPress={() => navigation.goBack()} />

      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  title: {
    fontSize: 30,
  },
});
