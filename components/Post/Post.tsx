import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { Likes } from '../Likes/Likes';
import { Comments } from "./subcomponents/Comments";

export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        padding: 5,
        borderRadius: 5,
        flexDirection: 'column',
    },
    userName: {
        fontSize: 17,
        color: 'black',
    },
    focused_userName: {
        fontSize: 17,
        color: '#059336',
        fontWeight: 'bold',
    },
    profilePicture: {
        width: 55,
        height: 55,
        borderRadius: 15
    },
    pressableView: {
        flexDirection: "row",   
        marginBottom: 15,
    },
    hashtagView: {
        flexDirection: "row",
        flex:1
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
        flexDirection: "column",
        flex: 7,
        marginLeft: 20,
        justifyContent: 'center',
    },
    commentsView: {
        flex: 2,
        margin: 5,
        justifyContent: 'flex-end'
    },
    likesView: {
        flex: 2,
        margin: 5,
        justifyContent: 'flex-end'
    },
    line: {
        borderBottomColor: 'lightgray',
        opacity: 0.3,
        borderBottomWidth: 1,
    }
  }); 

interface Props {
    post: Post
    index: number
    focusedPostIndex: number | undefined
    setFocusedPostIndex: Dispatch<SetStateAction<number | undefined>>
}

export const Post = ({ 
    post,
    index,
    focusedPostIndex,
    setFocusedPostIndex,
}: Props) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)

    function handleOnPress() {
        if (isFocused) {
            console.log("Post pressed again, pausing sound")
            setIsFocused(false)
            setFocusedPostIndex(undefined)
        } else {
            console.log("Post pressed, loading and playing sound")
            setIsFocused(true)
            setFocusedPostIndex(index)
        }
    }

    // TODO: Might not be the most optimal way of finding the focused post.
    useEffect(() => {
        if (focusedPostIndex == index) {
            setIsFocused(true)
        } else {
            setIsFocused(false)
        }
    }, [focusedPostIndex]);

    return (
    <View style={styles.container}>
        <Pressable
        onPress={handleOnPress}
        style={({ pressed }) => [
            {backgroundColor: pressed
                ? '#edf7fd'
                : 'white'
                }]}>
            <View style={styles.pressableView}>
                <View style={styles.pictureView}>
                    <Image
                    style={styles.profilePicture}
                    source={{
                        uri: post.user.profilePicture,
                    }} 
                    /> 
                </View>
                <View style={styles.textView}>
                    <Text style={isFocused ? styles.focused_userName : styles.userName}>{post.user.userName}</Text>
                    {post.hashtags && 
                        <View style={styles.hashtagView}>
                            <Text numberOfLines={1}> 
                                {post.hashtags.map((hashtag, index) => 
                                    <Text key={index} style={isFocused ? styles.focused_hashtag : styles.hashtag} numberOfLines={1}>#{hashtag}</Text>
                                )}
                            </Text>
                        
                    </View>
                    }
                </View>
                <View style={styles.commentsView}>
                    <Comments 
                    post={post}
                    />
                </View>
                <View style={styles.likesView}>
                    <Likes 
                    post={post}
                    />
                </View>
            </View>
        </Pressable>
        <View style={styles.line} />
    </View>
    );
}; 

