import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Routes } from "../Routes";

export function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          // Navigate to the details route with params
          navigation.navigate(Routes.Details, {
            itemId: 123,
            otherParam: "anything you want to pass",
          })
        }
      />
      <Button title="Posts" onPress={() => navigation.navigate(Routes.Posts)} />
    </View>
  );
}
