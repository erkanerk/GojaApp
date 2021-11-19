import React, { useState } from "react";
import { Platform, Image, StyleSheet, Pressable } from "react-native";

import { RegisterForm } from "../components/Forms/RegisterForm/RegisterForm";
import { LoginForm } from "../components/Forms/LoginForm/LoginForm";
import { Text, View } from "../components/Themed";

export default function AuthScreen() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.bigLogo}
                source={require("../assets/images/parrot.png")}
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
                <LoginForm />
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
                <RegisterForm />
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
        marginBottom: 40,
    },
    bigLogo: {
        height: 120,
        width: 120,
        marginBottom: 10,
    },
    button: {
        marginTop: 25,
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});
