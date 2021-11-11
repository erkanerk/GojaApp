import React, { useEffect, useState } from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { DropDown } from './subcomponents/DropDown';
import { Likes } from './subcomponents/Likes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 5,
        backgroundColor: '#e0f0ff',
        margin: 10,
        borderRadius: 5,
    },
    userName: {
        fontSize: 12,
    },
    profilePicture: {
        width: 50,
        height: 50,
    },
    hashtags: {
        fontSize: 10,
    },
    leftView: {
        flex: 2,
        margin: 5,
    },
    middleView: {
        flexDirection: "column",
        flex: 7,
        margin: 5,
    },
    rightView: {
        flexDirection: "column",    
        flex: 2,
        margin: 5,
    },
  }); 

interface Props {
    post: Post
}

export const FeedPost = ({ 
    post
}: Props) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(post.likes);

    async function playPost() {
        setIsLoading(true);
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/audio/assets_audio_assets_audio_file_example_MP3_700KB.mp3')
        );
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync(); 
        setIsPlaying(true);
        setIsLoading(false)
    }

    async function onPlayPausePressed() {
        if (sound != null) {
          if (isPlaying) {
            console.log('Pause Sound');
            await sound.pauseAsync();
            setIsPlaying(false);
          } else {
            console.log('Continue Sound');
            await sound.playAsync();
            setIsPlaying(true);
          }
        }
      };

    useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);

    return (
    <View style={styles.container}>
        <Pressable
            onPress={() => {
                playPost()
                setExpanded(true);
            }}
            style={({ pressed }) => [
                {backgroundColor: pressed
                    ? 'gray'
                    : '#e0f0ff'
                }]}
        >
        <View style={[{flexDirection: "row"}]}>
            <View style={styles.leftView}>
                <Image
                style={styles.profilePicture}
                source={{
                    uri: post.user.profilePicture,
                }} 
                /> 
            </View>
            <View style={styles.middleView}>
                <Text style={styles.userName}>{post.user.userName}</Text>
    
                <View style={[{flexDirection: "row"}]}>
                    {post.hashtags.map(hashtag => 
                        <Text style={[styles.hashtags,{flexDirection: "row"}]}>{hashtag.text}</Text>
                    )}
                </View>
            </View>
            <View style={styles.rightView}>
                <Likes 
                likes={likes}
                setLikes={setLikes}
                />
            </View>
        </View>
        
        </Pressable>
        {expanded &&
            <DropDown
            isPlaying={isPlaying}
            isLoading={isLoading}
            onPlayPausePressed={onPlayPausePressed}
            commentsCount={post.commentsCount}
            />
        }
    </View>
    );
}; 

