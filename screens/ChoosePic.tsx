import React, { useState, useContext } from 'react';
import * as Icon from 'react-native-feather';
import { StatusBar } from 'expo-status-bar';
import { Platform, Image, StyleSheet, Pressable, Alert } from 'react-native';
import { APIKit, getToken } from '../shared/APIkit';
import { Text, View } from '../components/Themed';
import Constants from 'expo-constants';
const { manifest } = Constants;
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import AppContext from '../shared/AppContext';
import Spinner from 'react-native-loading-spinner-overlay';

export default function ChoosePic({ navigation }) {
    const [image, setImage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const globalCtx = useContext(AppContext);

    const requestPermission = async () => {
        if (Platform.OS !== 'web') {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Sorry, we need camera roll permissions to make this work. Navigate to your settings on your device and allow camera roll permission for the app.'
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

    async function uploadImage() {
        setIsLoading(true);
        let apiUrl =
            `http://${manifest?.debuggerHost?.split(':').shift()}:3000` +
            '/users/upload-image/';
        const token = await getToken();

        FileSystem.uploadAsync(apiUrl, image, {
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                var urlNoQuotes = res.body.split('"').join('');
                const payload = {
                    url: urlNoQuotes,
                };
                APIKit.post('/users/add-profile-picture', payload)
                    .then((response) => {
                        globalCtx.setUserInfo({...globalCtx.userInfo, profilePicture: urlNoQuotes });
                        setIsLoading(false);
                        navigation.navigate('RecordProfileSound');
                    })
                    .catch((error) => {
                        console.log(error);
                        setIsLoading(false);
                    });
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }

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
        if (!image) {
            return <></>;
        } else {
            return (
                <Pressable style={styles.button} onPress={uploadImage}>
                    <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
            );
        }
    }

    return (
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <Text style={styles.title}>Choose a profile picture</Text>
            <Pressable onPress={pickImage} style={styles.imageCirle}>
                <PicPicker />
            </Pressable>
            <View style={styles.buttonContainer}>
                <ContinueButton />
            </View>
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
    buttonContainer:{
        height:40,
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
