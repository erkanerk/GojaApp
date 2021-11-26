import React, { useState } from 'react';
import {
    Platform,
    Image,
    StyleSheet,
    Pressable,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';

import { RegisterForm } from '../components/Forms/RegisterForm/RegisterForm';
import { LoginForm } from '../components/Forms/LoginForm/LoginForm';
import { Text, View } from '../components/Themed';

export default function ChoosePic({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.bigLogo}
                source={require('../assets/images/parrot.png')}
            />
            <View style={styles.titleBox}>
                <Text style={styles.title}>Goja</Text>
            </View>
            <FormTypeSwitcher navigation={navigation} />
        </View>
    );
}

function FormTypeSwitcher({ navigation }) {
    const [formType, setFormType] = useState('Login');
    if (formType == 'Login') {
        return (
            <>
                <LoginForm />
                <Pressable
                    style={styles.button}
                    onPress={() => setFormType('Register')}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>
            </>
        );
    } else {
        return (
            <>
                <RegisterForm navigation={navigation} />
                <Pressable
                    style={styles.button}
                    onPress={() => setFormType('Login')}
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BA0505',
    },
    titleBox: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 35,
        color: 'white',
    },
    bigLogo: {
        height: 100,
        width: 100,
        marginBottom: 0,
    },
    button: {
        marginTop: 20,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
});
