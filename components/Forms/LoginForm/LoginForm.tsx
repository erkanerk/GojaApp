import React, { useState } from "react";
import { StyleSheet, TextInput, Keyboard, Text, View } from "react-native";
import { SubmitButton } from '../SubmitButton';
import {APIKit, setClientToken} from '../../../shared/APIkit';
import Spinner from 'react-native-loading-spinner-overlay';

const styles = StyleSheet.create({
    input: {
      width: 200,
      height: 30,
      borderRadius: 20,
      paddingLeft: 15,
      backgroundColor: '#fff',
    },
    faultyInput: {
        borderWidth: 2,
        borderColor: 'red',
    },
    errorMessage: {
        color: 'red',
        marginLeft: 5,
    },
    formWrapper: {
        marginBottom: 40
    },
    inputField: {
        width: 200,
        marginBottom: 15,
    }
});

export const RegisterForm = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {

    }

    return (
    <>
        <Spinner visible={isLoading} />
        <View style={styles.formWrapper}>
            <View style={styles.inputField}>
                <TextInput
                    style={[styles.input, formErrors.usernameErrorMessage ? styles.faultyInput : null]}
                    value={userName}
                    placeholder={"Username"}
                    onChangeText={(text) => setUserName(text)}
                    autoCapitalize={"none"}
                />
                {formErrors.usernameErrorMessage ? <Text style={styles.errorMessage}>{formErrors.usernameErrorMessage}</Text> : null}
            </View>
            <View style={styles.inputField}>
                <TextInput
                    style={[styles.input, formErrors.passwordErrorMessage ? styles.faultyInput : null]}
                    value={password}
                    placeholder={"Password"}
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                />
                {formErrors.passwordErrorMessage ? <Text style={styles.errorMessage}>{formErrors.passwordErrorMessage}</Text> : null}
            </View>
        </View>
        <SubmitButton
            text={"Register"}
            onPress={onSubmit}
        />
    </>
    );
}; 