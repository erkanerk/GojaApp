import React, { useState, useContext } from "react";
import { TextInput, Keyboard, Text, View } from "react-native";
import { SubmitButton } from "../SubmitButton";
import { APIKit, saveUserSession, onFailure } from "../../../shared/APIkit";
import Spinner from "react-native-loading-spinner-overlay";
import { IFormErrors, emptyFormErrors, validateForm } from "./Utils";
import { styles } from "../Forms.Styles";
import AppContext from "../../../shared/AppContext";

export const RegisterForm = () => {
    const globalCtx = useContext(AppContext);
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
                saveUserSession("userSession", {
                    email: email,
                    token: response.data.token,
                });
                setIsLoading(false);
                globalCtx.setLoggedIn(true);
            })
            .catch((error) => {
                console.log(error && error);
                setIsLoading(false);
                onFailure(error, globalCtx);
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
