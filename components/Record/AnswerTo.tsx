import React from "react";
import { View, StyleSheet, Pressable, Text, Image } from "react-native";

interface PropTypes {
  imageUrl: string;
  username: string;
  hashtags: string[];
}

export const AnswerTo = ({ imageUrl, username, hashtags }: PropTypes) => {
  const i = {
    uri: imageUrl,
  };
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Image source={i} />
        <Text>{username}</Text>
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 24 }}>Answer to</Text>
    </View>
  );
};
