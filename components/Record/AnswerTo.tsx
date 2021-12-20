import React from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';

interface PropTypes {
    imageUrl: string | undefined;
    username: string | undefined;
    hashtags: string[] | undefined;
}

export const AnswerTo = ({ imageUrl, username, hashtags }: PropTypes) => {
    if (imageUrl === undefined) {
        imageUrl =
            'https://i.pinimg.com/236x/20/1f/01/201f016bd3a8576fc6cfc872ecac648e--dwight-schrute-hero-.jpg';
    }
    const picObject = {
        uri: imageUrl,
    };
    const shouldRender = username !== undefined && hashtags !== undefined;

    return (
        <View>
            {shouldRender ? (
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 24,
                            marginBottom: 15,
                        }}
                    >
                        Answer to
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
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
                            <View
                                style={{
                                    flexDirection: 'row',
                                    maxWidth: 180,
                                    flexWrap: 'wrap',
                                }}
                            >
                                {hashtags?.map((hashtag) => {
                                    return (
                                        <Text key={hashtag}>{hashtag} </Text>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                </View>
            ) : (
                <Text>Cant render</Text>
            )}
        </View>
    );
};
