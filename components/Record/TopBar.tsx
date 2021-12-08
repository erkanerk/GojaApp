import React, { Dispatch, SetStateAction } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    closeView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconView: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',

    },
    postView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 40,
        height: 40,
    },
    ready: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    readyView: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 30,
        backgroundColor: 'red',
        alignItems: 'center',
        elevation: 2,
    },
    notReady: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
    },
    notReadyView: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        alignItems: 'center'
    },
});

interface PropTypes {
    postToBackend: () => Promise<void>;
    canPost: boolean;
    buttonText: string;
    navigation: any;
    setModalVisible: Dispatch<SetStateAction<boolean>>
}

export const TopBar = ({ 
    postToBackend, 
    canPost, 
    buttonText,
    navigation,
    setModalVisible
}: PropTypes) => {

    function handleOnPressClose() {
        console.log('Close pressed')
        navigation.goBack()
    }

    function handleOnPressPost() {
        console.log('Post pressed')
        if (canPost) {
            //postToBackend()
            setModalVisible(true)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.closeView}>
                <Pressable
                onPress={handleOnPressClose}>
                    <Feather name="x" size={24} color="black" />
                </Pressable>
            </View>
            <View style={styles.iconView}>
                <Image style={styles.icon} source={require('../../assets/images/parrot.png')}/> 
            </View>
            <View style={styles.postView}>
                <Pressable
                onPress={handleOnPressPost}>
                    {canPost
                    ?
                    <View style={styles.readyView}>
                        <Text style={styles.ready}>{buttonText}</Text>
                    </View>
                    :
                    <View style={styles.notReadyView}>
                        <Text style={styles.notReady}>{buttonText}</Text>
                    </View>
                    }
                </Pressable>
            </View>
        </View>
    );
};
