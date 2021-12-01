import React from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';

interface PropTypes {
    imageUrl: string | null;
    username: string;
    hashtags: string[];
}

export const AnswerTo = ({ imageUrl, username, hashtags }: PropTypes) => {
    if (imageUrl === null) {
        imageUrl =
            'https://i.pinimg.com/236x/20/1f/01/201f016bd3a8576fc6cfc872ecac648e--dwight-schrute-hero-.jpg';
    }
    const picObject = {
        uri: imageUrl,
    };
    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View>
                <Image source={picObject} />
                <Text>{username}</Text>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Answer to</Text>
        </View>
    );
};
