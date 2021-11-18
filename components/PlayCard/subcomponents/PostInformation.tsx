import React, { useEffect, useState } from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { StyleSheet } from 'react-native';
import { Reply } from './Reply';
import { Likes } from './Likes';
import { SamplePosts } from '../../../assets/sampleData/Posts';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    pictureView: {
        flex: 1,
    },
    textView: {
        flex: 1,
        flexDirection: "column",
    },
    replyView: {
        flex: 1,
    },
    likesView: {
        flex: 1,
    },
    userName: {
        fontSize: 12,
    },
    profilePicture: {
        width: 50,
        height: 50,
    },
    hashtagView: {
        flexDirection: "row",
    },
    hashtag: {
        fontSize: 10,
    },
  }); 

interface Props {
    post: Post
}

export const PostInformation = ({ 
    post
}: Props) => {

    return (
    <View style={styles.container}>
        <View style={styles.pictureView}>
            <Image
                style={styles.profilePicture}
                source={{
                    uri: post.user.profilePicture,
                }} 
            /> 
        </View>
        <View style={styles.textView}>
            <View>
                <Text style={styles.userName}>{post.user.userName}</Text>
            </View>
            <View style={styles.hashtagView}>
                {post.hashtags.map(hashtag => 
                    <Text key={hashtag} style={styles.hashtag}>#{hashtag}</Text>
                )}
            </View>
        </View>
        <View style={styles.replyView}>
            <Reply 
            post={post}/>
        </View>
        <View style={styles.likesView}>
            <Likes 
            post={post}/>
        </View>
    </View>
    );
}; 

