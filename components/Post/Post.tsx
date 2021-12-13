import { useNavigation } from '@react-navigation/native';
import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { Likes } from '../Likes/Likes';
import { Comments } from './subcomponents/Comments';
import { Reply } from './subcomponents/Reply';
import CachedImage from 'expo-cached-image';
import LottieView from "lottie-react-native";

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 12,
        borderRadius: 5,
        flexDirection: 'column',
        backgroundColor: 'transparent',
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
    animation: {
        width: 25,
        marginLeft: 3
    },
    profilePicture: {
        width: 59,
        height: 59,
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
        fontSize: 20,
    },
    line: {
        borderBottomColor: 'lightgray',
        opacity: 0.3,
        borderBottomWidth: 1,
        width: 1,
    },
});

export enum PostType {
    MAIN,
    COMMENT_PARENT,
    COMMENT_CHILD,
    PROFILE,
}
interface Props {
    post: Post;
    isPlaying: boolean;
    postType?: PostType;
    index: number;
    focusedPostIndex: number | undefined;
    setFocusedPostIndex: Dispatch<SetStateAction<number | undefined>>;
    showComments?: (arg0: Post) => void;
    hideComments?: (arg0: any) => void;
}

export const Post = ({
    post,
    isPlaying,
    postType,
    index,
    focusedPostIndex,
    setFocusedPostIndex,
    showComments,
    hideComments,
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

    const lottieRef = useRef<LottieView>(null);

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
                            <CachedImage
                                style={styles.profilePicture}
                                source={{
                                    uri: post.user.profilePicture,
                                }}
                                cacheKey={post.user._id}
                            />
                        </View>
                    </Pressable>
                    <View style={styles.textView}>
                        <View style={{flexDirection: "row"}}>
                            <Text
                                style={
                                    isFocused
                                        ? styles.focused_userName
                                        : styles.userName
                                }
                            >
                                {post.user.userName}
                            </Text>
                            {(isFocused  && isPlaying) &&
                                <LottieView
                                    autoPlay
                                    loop={true}
                                    ref={lottieRef}
                                    source={require("../../assets/animations/soundwave.json")}
                                    style={styles.animation}
                                />
                            }
                        </View>
                        
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
                    {postType == PostType.MAIN && (
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.actionButton}>
                                <Comments
                                    post={post}
                                    showComments={showComments}
                                />
                            </View>
                            {post.funkyStatus && (
                                <View style={styles.actionButton}>
                                    <Text style={styles.funkyStatus}>
                                        {post.funkyStatus}
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}
                    {postType == PostType.COMMENT_PARENT && (
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.actionButton}>
                                <Likes post={post} />
                            </View>
                            <View style={styles.actionButton}>
                                <Comments
                                    post={post}
                                    showComments={showComments}
                                />
                            </View>
                            <View style={styles.actionButton}>
                                <Reply
                                    post={post}
                                    hideComments={hideComments}
                                />
                            </View>
                        </View>
                    )}
                    {postType == PostType.COMMENT_CHILD && (
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.actionButton}>
                                <Likes post={post} />
                            </View>
                        </View>
                    )}
                    {postType == PostType.PROFILE && (
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.actionButton}>
                                <Likes post={post} />
                            </View>
                            <View style={styles.actionButton}>
                                <Comments
                                    post={post}
                                    showComments={showComments}
                                />
                            </View>
                        </View>
                    )}
                </View>
            </Pressable>
            <View style={styles.line} />
        </View>
    );
};
