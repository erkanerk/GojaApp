import React, { Dispatch, SetStateAction, useState } from 'react';
import { Image, StyleSheet, View, Text, Pressable } from 'react-native';
import { MessageCircle } from 'react-native-feather';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    pressable: {
        flexDirection: 'row',
    },
    text: {
        marginLeft: 7,
        marginTop: 2,
        fontSize: 15,
    },
});

interface Props {
    post: Post;
    showComments?: (arg0: Post) => void;
}

export const Comments = ({ post, showComments }: Props) => {
    function handleOnPress() {
        if (showComments) {
            showComments(post);
        }
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.pressable} onPress={handleOnPress}>
                <View>
                    <MessageCircle
                        stroke="black"
                        fill="transparent"
                        width={25}
                        height={25}
                        strokeWidth={1}
                    />
                </View>
                <View>
                    <Text style={styles.text}>{post.commentCount}</Text>
                </View>
            </Pressable>
        </View>
    );
};
