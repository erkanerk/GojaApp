import React, { useState, useContext } from "react";
import { TextInput, Keyboard, Text, View } from "react-native";
import { SubmitButton } from "../SubmitButton";
import { APIKit, saveUserSession, onFailure } from "../../../shared/APIkit";
import { IFormErrors, emptyFormErrors, validateForm } from "./Utils";
import Spinner from "react-native-loading-spinner-overlay";
import { styles } from "../Forms.Styles";
import AppContext from "../../../shared/AppContext";

export const LoginForm = () => {
    const globalCtx = useContext(AppContext);
    const [email, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [formErrors, setFormErrors] = useState<IFormErrors>(emptyFormErrors);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        const { isValid, formErrors } = validateForm(email, password);
        setFormErrors(formErrors);
        if (isValid) {
            Keyboard.dismiss();
            await logInUser();
        }
    };

    const logInUser = async () => {
        const payload = { email: email, password };
        setIsLoading(true);
        APIKit.post("/users/login/", payload)
            .then((response) => {
                saveUserSession("userSession", {
                    email: email,
                    token: response.data.token,
                });
                setIsLoading(false);
                globalCtx.setUserInfo(response.data.user);
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
                        onChangeText={(text) => setUserName(text)}
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
            <SubmitButton text={"Log in"} onPress={onSubmit} />
        </View>
    );
};
