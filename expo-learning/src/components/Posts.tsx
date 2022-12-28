import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Routes } from "../Routes";

export function PostsScreen({ navigation, route }: any) {
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Create post"
        onPress={() => navigation.navigate(Routes.CreatePost)}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

export function CreatePostScreen({ navigation, route }: any) {
  const [postText, setPostText] = React.useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: Routes.Posts,
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  );
}
