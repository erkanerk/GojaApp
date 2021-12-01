import React from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';

export const OnlyPicture = () => {
    //TODO Should take the picture link as a prop
    const testPic = {
        uri: 'https://i.pinimg.com/236x/20/1f/01/201f016bd3a8576fc6cfc872ecac648e--dwight-schrute-hero-.jpg',
    };
    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Image
                style={{
                    height: 150,
                    width: 150,
                    borderRadius: 75,
                }}
                source={testPic}
            />
        </View>
    );
};
