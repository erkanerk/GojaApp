import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 19,
        width: 100,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
    },
    text: {
        color: "white",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 15,
        fontWeight: "bold",
    },
});

interface Props {
    text: string;
    onPress: () => void;
}

export const SubmitButton = (props: Props) => {
    return (
        <View>
            <Pressable style={styles.wrapper} onPress={props.onPress}>
                <Text style={styles.text}>{props.text}</Text>
            </Pressable>
        </View>
    );
};
