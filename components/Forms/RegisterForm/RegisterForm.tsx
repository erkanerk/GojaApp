import React, { useState } from "react";
import { StyleSheet, TextInput, Keyboard, Text, View } from "react-native";
import { SubmitButton } from "../SubmitButton";
import { APIKit, setClientToken } from "../../../shared/APIkit";
import Spinner from "react-native-loading-spinner-overlay";
import { IFormErrors, emptyFormErrors, validateForm } from "./Utils";

const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
    },
    input: {
        width: 200,
        height: 30,
        borderRadius: 20,
        paddingLeft: 15,
        backgroundColor: "#fff",
    },
    faultyInput: {
        borderWidth: 2,
        borderColor: "pink",
    },
    errorMessage: {
        color: "pink",
        marginLeft: 5,
    },
    formWrapper: {
        marginBottom: 24,
    },
    inputField: {
        color: "black",
        width: 200,
        marginBottom: 15,
    },
    placeHolder: {
        color: "grey",
    },
});

export const RegisterForm = () => {
    const [email, setEmail] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [formErrors, setFormErrors] = useState<IFormErrors>(emptyFormErrors);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        const { isValid, formErrors } = validateForm(email, userName, password);
        setFormErrors(formErrors);
        if (isValid) {
            Keyboard.dismiss();
            await registerUser();
        }
    };

    const registerUser = async () => {
        const payload = { email, userName, password };
        setIsLoading(true);
        APIKit.post("/users/signup/", payload)
            .then((response) => {
                setClientToken(response.data.token);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error && error);
                setIsLoading(false);
            });
    };

    return (
        <View style={styles.wrapper}>
            <Spinner visible={isLoading} />
            <View style={styles.formWrapper}>
                <View style={styles.inputField}>
                    <TextInput
                        style={[
                            styles.input,
                            formErrors.emailErrorMessage
                                ? styles.faultyInput
                                : null,
                        ]}
                        value={email}
                        placeholder={"Email"}
                        placeholderTextColor={styles.placeHolder.color}
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize={"none"}
                    />
                    {formErrors.emailErrorMessage ? (
                        <Text style={styles.errorMessage}>
                            {formErrors.emailErrorMessage}
                        </Text>
                    ) : null}
                </View>
                <View style={styles.inputField}>
                    <TextInput
                        style={[
                            styles.input,
                            formErrors.usernameErrorMessage
                                ? styles.faultyInput
                                : null,
                        ]}
                        value={userName}
                        placeholder={"Username"}
                        placeholderTextColor={styles.placeHolder.color}
                        onChangeText={(text) => setUserName(text)}
                        autoCapitalize={"none"}
                    />
                    {formErrors.usernameErrorMessage ? (
                        <Text style={styles.errorMessage}>
                            {formErrors.usernameErrorMessage}
                        </Text>
                    ) : null}
                </View>
                <View style={styles.inputField}>
                    <TextInput
                        style={[
                            styles.input,
                            formErrors.passwordErrorMessage
                                ? styles.faultyInput
                                : null,
                        ]}
                        value={password}
                        placeholder={"Password"}
                        placeholderTextColor={styles.placeHolder.color}
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                    />
                    {formErrors.passwordErrorMessage ? (
                        <Text style={styles.errorMessage}>
                            {formErrors.passwordErrorMessage}
                        </Text>
                    ) : null}
                </View>
            </View>
            <SubmitButton text={"Register"} onPress={onSubmit} />
        </View>
    );
};
