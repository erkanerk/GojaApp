import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        padding: 5,
        borderRadius: 5,
        flexDirection: 'column',
    },
    profilePicture: {
        width: 52,
        height: 52,
        borderRadius: 15
    },
    pressableView: {
        flexDirection: "row",   
        marginBottom: 15,
    },
    pictureView: {
        flex: 2,
    },
    textView: {
        flexDirection: "column",
        flex: 7,
        marginLeft: 20,
    },
    text: {
        fontSize: 15,
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
    
    function handleOnPress() {
        console.log('Picture pressed, redirecting to profile')
        navigation.navigate('ProfileScreen', {userId: event.userId})
    }

    return (
    <View style={styles.container}>            
        <View style={styles.pressableView}>
            <Pressable
            onPress={handleOnPress}>
                <View style={styles.pictureView}>
                    <Image
                    style={styles.profilePicture}
                    source={{
                        uri: event.profilePicture,
                    }} 
                    /> 
                </View>
            </Pressable>
        </View>
        <View style={styles.textView}>
            <Text style={styles.text}>{event.userName} {event.event}</Text>
        </View>
    </View>
    );
}; 

