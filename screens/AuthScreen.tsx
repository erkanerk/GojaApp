import React, { useState } from "react";
import {
    Platform,
    Image,
    StyleSheet,
    Pressable,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";

import { RegisterForm } from "../components/Forms/RegisterForm/RegisterForm";
import { LoginForm } from "../components/Forms/LoginForm/LoginForm";
import { Text, View } from "../components/Themed";

export default function AuthScreen() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <Image
                    style={styles.bigLogo}
                    source={require("../assets/images/parrotVit.png")}
                />
                <View style={styles.titleBox}>
                    <Text style={styles.title}>Goja</Text>
                </View>
                <FormTypeSwitcher />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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
                    <Text style={styles.buttonText}>Register</Text>
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
                    <Text style={styles.buttonText}>Log in</Text>
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
    titleBox: {
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 35,
        color: "white",
    },
    bigLogo: {
        height: 140,
        width: 140,
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
        backgroundColor: "rgba(0, 0, 0, 0)",
        width: 100,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
    },
});
