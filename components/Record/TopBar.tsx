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

interface PropTypes {
  postToBackend: () => Promise<void>;
  canPost: boolean;
  buttonText: string;
}

const styles = StyleSheet.create({
  postButtonContainer: {
    width: 50,
    height: 30,
    marginTop: 15,
    marginRight: 10,
    backgroundColor: "#FF0000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  disablePostButton: {
    width: 50,
    height: 30,
    marginTop: 15,
    marginRight: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
});

export const TopBar = ({ postToBackend, canPost, buttonText }: PropTypes) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 50,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Pressable style={{ marginLeft: 15, marginTop: 10 }}>
        <Text style={{ color: "#FF0000", fontWeight: "bold" }}>Cancel</Text>
      </Pressable>
      <Image
        style={{ width: 50, height: 50 }}
        source={require("../../assets/images/parrot.png")}
      />

      <Pressable
        style={canPost ? styles.postButtonContainer : styles.disablePostButton}
        onPress={postToBackend}
      >
        <Text style={canPost ? { color: "#FFFFFF" } : { color: "#FF0000" }}>
          {buttonText}
        </Text>
      </Pressable>
    </View>
  );
};
