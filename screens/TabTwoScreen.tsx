import * as React from "react";
import { StyleSheet } from "react-native";
import { RecordButton } from "../components/Record/RecordButton";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { RecordingScreen } from "./postFlow/RecordingScreen";
import { PostType } from "./postFlow/RecordingScreen";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <RecordingScreen recordingScreenType={PostType.POST} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
