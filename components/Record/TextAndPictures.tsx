import React from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';

interface PropTypes {
    pictureUrl: string | null;
}

export const TextAndPictures = ({ pictureUrl }: PropTypes) => {
    if (pictureUrl === null) {
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
            <Text
                style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 16,
                    width: 200,
                    marginBottom: 50,
                }}
            >
                Record a one second sound clip that identifies your profile.
            </Text>
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
