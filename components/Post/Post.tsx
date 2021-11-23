import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { Likes } from '../Likes/Likes';
import { Comments } from "./subComponents/Comments";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 5,
        margin: 10,
        borderRadius: 5,
        flexDirection: 'column',
    },
    userName: {
        fontSize: 12,
    },
    focused_userName: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    profilePicture: {
        width: 50,
        height: 50,
    },
    pressableView: {
        flexDirection: "row",    
    },
    hashtagView: {
        flexDirection: "row",
    },
    hashtag: {
        fontSize: 10,
    },
    focused_hashtag: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    pictureView: {
        flex: 2,
    },
    textView: {
        flexDirection: "column",
        flex: 7,
        margin: 5,
    },
    commentsView: {
        flex: 2,
        margin: 5,
    },
    likesView: {
        flex: 2,
        margin: 5,
    },
    line: {
        borderBottomColor: 'lightgray',
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
        
                    <View style={styles.hashtagView}>
                        {post.hashtags.map(hashtag => 
                            <Text key={hashtag} style={isFocused ? styles.focused_hashtag : styles.hashtag}>#{hashtag}</Text>
                        )}
                    </View>
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

