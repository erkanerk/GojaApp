import React from 'react';
import { Image, View, Text} from 'react-native';

import { StyleSheet } from 'react-native';
import { Reply } from '../../Post/subcomponents/Reply';
import { Likes } from '../../Likes/Likes';
import { Comments } from '../../Post/subcomponents/Comments';

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'flex-start',
    },
    pictureView: {
        marginRight: 10,
    },
    textView: {
        flex: 2,
        flexDirection: "column",
    },
    replyView: {
        marginTop: 5,
        marginRight: 15
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
    actionButton: {
        margin: 5,
        justifyContent: 'flex-end',
    },
  }); 

interface Props {
    post: Post;
    showComments?: (arg0: Post) => void;
}

export const PostInformation = ({ 
    post,
    showComments,
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
    </View>
    );
}; 

