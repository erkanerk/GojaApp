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
            <Text
                style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 15 }}
            >
                Answer to
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={picObject}
                    style={{
                        height: 50,
                        width: 50,
                        borderRadius: 10,
                    }}
                />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ marginBottom: 10 }}>{username}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {hashtags.map((hashtag) => {
                            return <Text key={hashtag}>#{hashtag} </Text>;
                        })}
                    </View>
                </View>
            </View>
        </View>
    );
};
