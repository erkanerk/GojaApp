import React from 'react';
import { Image, View, Text} from 'react-native';

import { StyleSheet } from 'react-native';
import { Reply } from './Reply';
import { Likes } from '../../Likes/Likes';

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'flex-start',
    },
    pictureView: {
        flex: 1,
    },
    textView: {
        flex: 2,
        flexDirection: "column",
    },
    replyView: {
        marginTop: 5,
        flex: 1,
    },
    likesView: {
        marginTop: 5,
        flex: 1,
    },
    userName: {
        fontSize: 18,
    },
    profilePicture: {
        width: 52,
        height: 52,
        borderRadius: 15
    },
    hashtagView: {
        flexDirection: "row",
        flexWrap: 'wrap'
    },
    hashtag: {
        fontSize: 15,
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
                    <Text key={hashtag} style={styles.hashtag}>#{hashtag} </Text>
                )}
            </View>
        </View>
        <View style={styles.replyView}>
            <Reply 
            post={post}/>
        </View>
    </View>
    );
}; 

