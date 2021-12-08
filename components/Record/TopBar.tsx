import React, { Dispatch, SetStateAction } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { CancelNavigator } from '../../navigation/components/CancelNavigator';
import { PostType } from '../../constants/types/PostType';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParamList } from '../../types';

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
    readyText: {
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
    notReadyText: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
    },
    notReadyView: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        alignItems: 'center',
    },
});

interface PropTypes {
    postToBackend: () => Promise<void>;
    canPost: boolean;
    navigation: NativeStackNavigationProp<RootTabParamList, 'FeedTab'>;
    recordingScreenType: PostType;
}

export const TopBar = ({ 
    postToBackend, 
    canPost, 
    navigation,
    recordingScreenType,
}: PropTypes) => {

    function handleOnPressClose() {
        console.log('Left button pressed')
        navigation.goBack()
    }

    function handleOnPressPost() {
        console.log('Right button pressed')
        if (canPost) {
            postToBackend()
            navigation.navigate('FeedTab')
        }
    }

    function conditionalRender() {
        if (recordingScreenType === PostType.REGISTER && !canPost) {
            return (
                <View style={styles.notReadyView}>
                    <Text style={styles.notReadyText}>Done</Text>
                </View>
            );
        } else if (recordingScreenType === PostType.REGISTER && canPost) {
            return (
                <View style={styles.readyView}>
                    <Text style={styles.readyText}>Done</Text>
                </View>
            );
        } else if (recordingScreenType === PostType.POST && canPost) {
            return (
                <View style={styles.readyView}>
                    <Text style={styles.readyText}>Post</Text>
                </View>
            );
        } else if (recordingScreenType === PostType.POST && !canPost) {
            return (
                <View style={styles.notReadyView}>
                    <Text style={styles.notReadyText}>Post</Text>
                </View>
            );
        } else if (recordingScreenType === PostType.ANSWER && canPost) {
            return (
                <View style={styles.readyView}>
                    <Text style={styles.readyText}>Reply</Text>
                </View>
            );
        } else if (recordingScreenType === PostType.ANSWER && !canPost) {
            return (
                <View style={styles.notReadyView}>
                    <Text style={styles.notReadyText}>Reply</Text>
                </View>
            );
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.closeView}>
                <Pressable
                onPress={handleOnPressClose}>
                    {recordingScreenType === PostType.REGISTER
                    ?
                    <CancelNavigator />
                    :
                    <Feather name="x" size={24} color="black" />
                    }
                </Pressable>
            </View>
            <View style={styles.iconView}>
                <Image style={styles.icon} source={require('../../assets/images/parrot.png')}/> 
            </View>
            <View style={styles.postView}>
                <Pressable
                onPress={handleOnPressPost}>
                    {conditionalRender()}
                </Pressable>
            </View>
        </View>
    );
};
