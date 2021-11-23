import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { RecordButton } from "../components/Record/RecordButton";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  return (
    <View style={styles.container}>
      <RecordButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
