import React from "react";
import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import { RecordButton } from "../../components/Record/RecordButton";
import { TopBar } from "../../components/Record/TopBar";

export const RecordingScreen = () => {
  const testPic = {
    uri: "https://i.pinimg.com/236x/20/1f/01/201f016bd3a8576fc6cfc872ecac648e--dwight-schrute-hero-.jpg",
  };
  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "white",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <TopBar />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            height: 150,
            width: 150,
            borderRadius: 75,
          }}
          source={testPic}
        />
      </View>

      <View
        style={{
          marginBottom: 75,
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <RecordButton />
      </View>
    </View>
  );
};
