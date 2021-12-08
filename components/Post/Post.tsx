import { useNavigation } from '@react-navigation/native';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { Likes } from '../Likes/Likes';
import { Comments } from './subcomponents/Comments';

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 12,
        borderRadius: 5,
        flexDirection: 'column',
    },
    userName: {
        fontSize: 18,
        color: 'black',
    },
    focused_userName: {
        fontSize: 18,
        color: '#059336',
        fontWeight: 'bold',
    },
    profilePicture: {
        width: 59,
        height: 59,
        borderRadius: 15,
    },
    pressableView: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    hashtagView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-end',
    },
    hashtag: {
        fontSize: 15,
        color: 'black',
    },
    focused_hashtag: {
        fontSize: 15,
        color: '#059336',
        fontWeight: 'bold',
    },
    pictureView: {
        flex: 2,
    },
    textView: {
        flexDirection: 'column',
        flex: 7,
        marginLeft: 20,
    },
    commentsView: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    likesView: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    line: {
        borderBottomColor: 'lightgray',
        opacity: 0.3,
        borderBottomWidth: 1,
    },
});

interface Props {
    post: Post;
    index: number;
    focusedPostIndex: number | undefined;
    setFocusedPostIndex: Dispatch<SetStateAction<number | undefined>>;
    showComments?: (arg0: Post) => void;
}

export const Post = ({
    post,
    index,
    focusedPostIndex,
    setFocusedPostIndex,
    showComments,
}: Props) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const navigation = useNavigation();

    function handleOnPressPicture() {
        navigation.navigate('ProfileScreen', { userId: post.user._id });
    }

    function handleOnPressPost() {
        if (isFocused) {
            setIsFocused(false);
            setFocusedPostIndex(undefined);
        } else {
            setIsFocused(true);
            setFocusedPostIndex(index);
        }
    }

    // TODO: Might not be the most optimal way of finding the focused post.
    useEffect(() => {
        if (focusedPostIndex == index) {
            setIsFocused(true);
        } else {
            setIsFocused(false);
        }
    }, [focusedPostIndex]);

    return (
        <View style={styles.container}>
            <Pressable
                onPress={handleOnPressPost}
                style={({ pressed }) => [
                    { backgroundColor: pressed ? '#edf7fd' : 'white' },
                ]}
            >
                <View style={styles.pressableView}>
                    <Pressable onPress={handleOnPressPicture}>
                        <View style={styles.pictureView}>
                            <Image
                                style={styles.profilePicture}
                                source={{
                                    uri: post.user.profilePicture,
                                }}
                            />
                        </View>
                    </Pressable>
                    <View style={styles.textView}>
                        <Text
                            style={
                                isFocused
                                    ? styles.focused_userName
                                    : styles.userName
                            }
                        >
                            {post.user.userName}
                        </Text>
                        {post.hashtags && (
                            <View style={styles.hashtagView}>
                                <Text numberOfLines={1}>
                                    {post.hashtags.map((hashtag, index) => (
                                        <Text
                                            key={index}
                                            style={
                                                isFocused
                                                    ? styles.focused_hashtag
                                                    : styles.hashtag
                                            }
                                            numberOfLines={1}
                                        >
                                            #{hashtag}
                                        </Text>
                                    ))}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.commentsView}>
                        <Comments post={post} showComments={showComments} />
                    </View>
                    <View style={styles.likesView}>
                        <Likes post={post} />
                    </View>
                </View>
            </Pressable>
            <View style={styles.line} />
        </View>
    );
};
