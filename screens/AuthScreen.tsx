import React, { useState } from "react";
import { Platform, Image, StyleSheet, Pressable } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function AuthScreen() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.bigLogo}
                source={require("../assets/images/parrot.svg")}
            />
            <Text style={styles.title}>Goja</Text>
            <FormTypeSwitcher />
        </View>
    );
}

function FormTypeSwitcher() {
    const [formType, setFormType] = useState("Login");
    if (formType == "Login") {
        return (
            <>
                <Text style={styles.buttonText}>loginFrom!</Text>
                <Pressable
                    style={styles.button}
                    onPress={() => setFormType("Register")}
                >
                    <Text style={styles.buttonText}>register</Text>
                </Pressable>
            </>
        );
    } else {
        return (
            <>
                <Text style={styles.buttonText}>registerFrom!</Text>
                <Pressable
                    style={styles.button}
                    onPress={() => setFormType("Login")}
                >
                    <Text style={styles.buttonText}>login</Text>
                </Pressable>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#BA0505",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
    },
    bigLogo: {
        height: 150,
        width: 150,
    },
    button: {
        marginTop: 15,
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});
