import React, { useState, useEffect } from 'react';
import * as Icon from 'react-native-feather';
import { StatusBar } from 'expo-status-bar';
import {
    Platform,
    Image,
    StyleSheet,
    Pressable,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Button,
    Alert,
} from 'react-native';

import { RegisterForm } from '../components/Forms/RegisterForm/RegisterForm';
import { LoginForm } from '../components/Forms/LoginForm/LoginForm';
import { Text, View } from '../components/Themed';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Constants from 'expo-Constants';
import { ScreenHeight } from 'react-native-elements/dist/helpers';

export default function ChoosePic({ navigation }) {
    const [image, setImage] = useState<string>('');

    const requestPermission = async () => {
        if (Platform.OS !== 'web') {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Sorry, we need camera roll permissions to make this work!'
                );
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    };

    const pickImage = async () => {
        let permission = await requestPermission();
        if (!permission) {
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        if (!result.cancelled) {
            if (result.type == 'image') {
                setImage(result.uri);
            } else {
                Alert.alert('Please choose an image');
            }
        }
    };

    function PicPicker() {
        if (image == '') {
            return (
                <Icon.PlusCircle
                    color="#fff"
                    strokeWidth={1}
                    width={90}
                    height={90}
                />
            );
        } else {
            return <Image source={{ uri: image }} style={styles.image} />;
        }
    }
    function ContinueButton() {
        if (image == '') {
            return <View style={{ height: 40 }}></View>;
        } else {
            return (
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
            );
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose a profile picture</Text>
            <Pressable onPress={pickImage} style={styles.imageCirle}>
                <PicPicker />
            </Pressable>
            <ContinueButton />
            <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    imageCirle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 130,
        height: 130,
        borderRadius: 100,
        marginBottom: 150,
        backgroundColor: 'grey',
    },
    image: { width: 130, height: 130, borderRadius: 100 },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 19,
        width: 115,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});
