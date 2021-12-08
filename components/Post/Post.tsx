import { useNavigation } from '@react-navigation/native';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { Likes } from '../Likes/Likes';
import { Comments } from './subcomponents/Comments';
import { Reply } from './subcomponents/Reply';

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5,
        flexDirection: 'column',
        backgroundColor: 'transparent'
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
        width: 52,
        height: 52,
        borderRadius: 15,
    },
    pressableView: {
        flexDirection: 'row',
        paddingBottom: 15,
        backgroundColor: 'transparent',
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
    actionButton: {
        margin: 5,
        justifyContent: 'flex-end',
    },
    funkyStatus: {
        fontSize: 20
    },
    line: {
        borderBottomColor: 'lightgray',
        opacity: 0.3,
        borderBottomWidth: 1,
    },
});

export enum PostType {
    MAIN,
    COMMENT_PARENT,
    COMMENT_CHILD,
    PROFILE
}
interface Props {
    post: Post;
    postType?: PostType;
    index: number;
    focusedPostIndex: number | undefined;
    setFocusedPostIndex: Dispatch<SetStateAction<number | undefined>>;
    showComments?: (arg0: Post) => void;
}

export const Post = ({
    post,
    postType,
    index,
    focusedPostIndex,
    setFocusedPostIndex,
    showComments,
}: Props) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const navigation = useNavigation();

    function handleOnPressPicture() {
        console.log('Picture pressed, redirecting to profile');
        navigation.navigate('ProfileScreen', { userId: post.user._id });
    }

    function handleOnPressPost() {
        if (isFocused) {
            console.log('Post pressed again, pausing sound');
            setIsFocused(false);
            setFocusedPostIndex(undefined);
        } else {
            console.log('Post pressed, loading and playing sound');
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
                    { backgroundColor: pressed ? '#edf7fd' : 'transparent' },
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
                    {postType == PostType.MAIN &&
                        <View style={{ flexDirection: 'row'}}>
                            <View style={styles.actionButton}>
                                <Comments post={post} showComments={showComments} />
                            </View>
                            {post.funkyStatus &&
                                <View style={styles.actionButton}>
                                    <Text style={styles.funkyStatus}>{post.funkyStatus}</Text>
                                </View>
                            }
                        </View>
                    }
                    {postType == PostType.COMMENT_PARENT &&
                        <View style={{ flexDirection: 'row'}}>
                            <View style={styles.actionButton}>
                                <Likes post={post} />
                            </View>
                            <View style={styles.actionButton}>
                                <Comments post={post} showComments={showComments} />
                            </View>
                            <View style={styles.actionButton}>
                                <Reply 
                                post={post}/>
                            </View>
                        </View>
                    }
                    {postType == PostType.COMMENT_CHILD &&
                        <View style={{ flexDirection: 'row'}}>
                            <View style={styles.actionButton}>
                                <Likes post={post} />
                            </View>
                        </View>
                    }
                    {postType == PostType.PROFILE &&
                        <View style={{ flexDirection: 'row'}}>
                            <View style={styles.actionButton}>
                                <Likes post={post} />
                            </View>
                            <View style={styles.actionButton}>
                                <Comments post={post} showComments={showComments} />
                            </View>
                        </View>
                    }
                </View>
            </Pressable>
            <View style={styles.line} />
        </View>
    );
};
