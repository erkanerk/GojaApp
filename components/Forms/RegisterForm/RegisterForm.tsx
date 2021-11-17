import React, { useState } from "react";
import { StyleSheet, TextInput, Keyboard, Text, View } from "react-native";
import { Button } from '../Button';
import {APIKit, setClientToken} from '../../../shared/APIkit';
import Spinner from 'react-native-loading-spinner-overlay';
import { validateEmail, validateUserName, validatePassword } from "./Utils";

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
	  
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [userName, setUserName] = useState("");
	const [userNameError, setUserNameError] = useState("");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
  	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async () => {
		const {emailIsValid, emailErrorMessage} = validateEmail(email);
		const {usernameIsValid, usernameErrorMessage} = validateUserName(userName);
		const {passwordIsValid, passwordErrorMessage} = validatePassword(password);

		if (emailIsValid && usernameIsValid && passwordIsValid) {
			Keyboard.dismiss();
			await registerUser();
			setEmailError("");
			setUserNameError("");
			setPasswordError("");
		} else {
			setEmailError(emailErrorMessage);
			setUserNameError(usernameErrorMessage);
			setPasswordError(passwordErrorMessage);
		}
	}

	const registerUser = async () => {
		const payload = {email, userName, password};

		setIsLoading(true);

		APIKit.post('/users/signup/', payload)
			.then((response) => {
				setClientToken(response.data.token);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error && error);
				setIsLoading(false);
			});
	}

  	return (
    	<>
			<Spinner visible={isLoading} />
			<View style={styles.formWrapper}>
				<View style={styles.inputField}>
					<TextInput
						style={[styles.input, emailError ? styles.faultyInput : null]}
						value={email}
						placeholder={"Email"}
						onChangeText={(text) => setEmail(text)}
						autoCapitalize={"none"}
					/>
					{emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
				</View>
				<View style={styles.inputField}>
					<TextInput
						style={[styles.input, userNameError ? styles.faultyInput : null]}
						value={userName}
						placeholder={"Username"}
						onChangeText={(text) => setUserName(text)}
						autoCapitalize={"none"}
					/>
					{userNameError ? <Text style={styles.errorMessage}>{userNameError}</Text> : null}
				</View>
				<View style={styles.inputField}>
					<TextInput
						style={[styles.input, passwordError ? styles.faultyInput : null]}
						value={password}
						placeholder={"Password"}
						secureTextEntry
						onChangeText={(text) => setPassword(text)}
					/>
					{passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
				</View>
			</View>
			<Button
				disabled={false}
				text={"Register"}
				onPress={onSubmit}
			/>
    	</>
  	);
}; 