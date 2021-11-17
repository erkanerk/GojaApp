import React, { useState } from "react";
import { Platform, Image, StyleSheet } from "react-native";

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
                <Text style={styles.title}>loginFrom!</Text>
                <button onClick={() => setFormType("Register")}>
                    Register
                </button>
            </>
        );
    } else {
        return (
            <>
                <Text style={styles.title}>registerFrom!</Text>
                <button onClick={() => setFormType("Login")}>Login</button>
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
});
