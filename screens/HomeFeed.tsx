import React, { useEffect, useState, useContext } from "react";
import { View, Text } from "react-native";
import { RootTabScreenProps } from "../types";
import { StyleSheet } from "react-native";
import { PostFeed } from "../components/PostFeed/PostFeed";
import { APIKit, onFailure } from "../shared/APIkit";
import { useIsFocused } from "@react-navigation/native";
import AppContext from "../shared/AppContext";

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    flex: 1,
  },
  feedView: {
    flex: 1,
  },
  playCardView: {},
});

export default function HomeFeed({
  navigation,
}: RootTabScreenProps<"TabThree">) {
  const globalCtx = useContext(AppContext);
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAllPosts();
    }
  }, [isFocused]);

  async function getAllPosts() {
    APIKit.get("/posts/all")
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        onFailure(error, globalCtx);
        console.log(error && error);
        setIsLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      {isLoading ? <Text>Loading...</Text> : null}
      <PostFeed posts={posts} />
    </View>
  );
}
