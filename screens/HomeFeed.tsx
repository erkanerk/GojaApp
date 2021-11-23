import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { RootTabScreenProps } from "../types";
import { StyleSheet } from "react-native";
import { PostFeed } from "../components/PostFeed/PostFeed";
import { APIKit } from "../shared/APIkit";

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
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    APIKit.get("/posts/all")
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error && error);
        setIsLoading(false);
      });
    setIsLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <Text>Loading...</Text> : null}
      <PostFeed posts={posts} />
    </View>
  );
}
