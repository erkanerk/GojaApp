import React from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';

interface PropTypes {
    pictureUrl: string | undefined;
}

export const OnlyPicture = ({ pictureUrl }: PropTypes) => {
    if (pictureUrl === undefined) {
        pictureUrl =
            'https://i.pinimg.com/236x/20/1f/01/201f016bd3a8576fc6cfc872ecac648e--dwight-schrute-hero-.jpg';
    }
    const picObject = {
        uri: pictureUrl,
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
                source={picObject}
            />
        </View>
    );
};
