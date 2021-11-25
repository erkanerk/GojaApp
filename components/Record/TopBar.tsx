import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Button,
  Image,
  Dimensions,
} from "react-native";

export const TopBar = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 50,
        justifyContent: 'space-between',
        alignItems: "center",
      }}
    >
      <Pressable style={{marginLeft: 15,  marginTop: 10, }} >
        <Text style={{ color: "#FF0000", fontWeight: "bold" }}>
          Cancel
        </Text>
      </Pressable>
      <Image
        style={{ width: 50, height: 50 }}
        source={require("../../assets/images/parrot.png")}
      />
      <Pressable style={{ marginTop: 15, marginRight: 10 }}>
        <Text style={{ color: "#FF0000" }}>Post</Text>
      </Pressable>
    </View>
  );
};
