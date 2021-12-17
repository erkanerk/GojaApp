import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 15
    },
    pressableView: {
    },
    pictureView: {
    },
    textView: {
        marginLeft: 15,
        alignSelf: 'center',
    },
    text: {
        fontSize: 20,
        color: 'black',
    },    
  }); 

interface Props {
    event: Notification
}

export const NotificationEvent = ({ 
    event
}: Props) => {
    const navigation = useNavigation();
    
    function handleOnPressImage() {
        //console.log('Picture pressed, redirecting to profile')
        navigation.navigate('ProfileScreen', {userId: event.userId})
    }

    function handleOnPressText() {
        //console.log('Text pressed')
    }

    return (
    <View style={styles.container}>            
        <View style={styles.pictureView}>
            <Pressable
            onPress={handleOnPressImage}>
                <Image
                style={styles.profilePicture}
                source={{
                    uri: event.profilePicture,
                }} 
                /> 
            </Pressable>
        </View>
        <View style={styles.textView}>
            <Pressable
            onPress={handleOnPressText}>
                    <Text style={styles.text}>{event.userName} {event.event}</Text>
            </Pressable>
        </View>
    </View>
    );
}; 

