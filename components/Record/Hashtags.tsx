import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

interface PropTypes {
  hashtagSetter: React.Dispatch<React.SetStateAction<string>>;
  hashtags: string;
}

export const Hashtags = ({ hashtagSetter, hashtags }: PropTypes) => {
  return (
    <View style={{ justifyContent: "center", alignSelf: "center" }}>
      <TextInput
        style={{
          height: 40,
          margin: 12,
          width: 200,
          textAlign: "center",
          borderRadius: 20,
          backgroundColor: "#ECE9E9",
        }}
        onChangeText={hashtagSetter}
        value={hashtags}
        placeholder="Add hashtags"
      />
    </View>
  );
};
