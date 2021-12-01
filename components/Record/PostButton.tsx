import React from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Text,
    Button,
    Image,
    Dimensions,
} from 'react-native';

interface PropTypes {
    postToBackend: () => Promise<void>;
    canPost: boolean;
    buttonText: string;
}

const styles = StyleSheet.create({
    postButtonContainer: {
        width: 75,
        height: 50,

        backgroundColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    disablePostButton: {
        width: 75,
        height: 50,

        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
});

export const PostButton = ({
    postToBackend,
    canPost,
    buttonText,
}: PropTypes) => {
    return (
        <View
            style={{
                flexDirection: 'row',

                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Pressable
                style={
                    canPost
                        ? styles.postButtonContainer
                        : styles.disablePostButton
                }
                onPress={postToBackend}
            >
                <Text
                    style={
                        canPost ? { color: '#FFFFFF' } : { color: '#FF0000' }
                    }
                >
                    {buttonText}
                </Text>
            </Pressable>
        </View>
    );
};
