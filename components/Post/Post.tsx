import React, { useEffect, useState } from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
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
    hashtagView: {
        flexDirection: "row",
    },
    hashtag: {
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
    pressableView: {
        flexDirection: "row",    
    },
  }); 

interface Props {
    post: Post
}

export const Post = ({ 
    post
}: Props) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(post.likes);
    const [soundPosition, setSoundPosition] = useState<number | undefined>(undefined);
    const [soundDuration, setSoundDuration] = useState<number | undefined>(undefined);
    const [isSeeking, setIsSeeking] = useState<boolean>(false);
    const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = useState<boolean>(false);
    const [shouldPlay, setShouldPlay] = useState<boolean>(false);
    const [isPlaybackAllowed, setIsPlaybackAllowed] = useState<boolean>(false);

    // TODO: change to S3 files 
    const TempSoundUrl = require('../../assets/audio/assets_audio_assets_audio_file_example_MP3_700KB.mp3')

    
    function onPlaybackStatusUpdate( playbackStatus: AVPlaybackStatus ) {
        if (!playbackStatus.isLoaded) {
            // Update your UI for the unloaded state
            setIsPlaybackAllowed(false)
            setSoundDuration(undefined)
            setSoundPosition(undefined)

            if (playbackStatus.error) {
              console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
              // Send Expo team the error on Slack or the forums so we can help you debug!
            }
          } else {
            // Update your UI for the loaded state
        
            if (playbackStatus.isPlaying) {
                // Update your UI for the playing state
                setIsPlaying(true)
            } else {
                // Update your UI for the paused state
                setIsPlaying(false)
            }
        
            if (playbackStatus.isBuffering) {
              // Update your UI for the buffering state
                setIsLoading(true)
            } else {
                setIsLoading(false)
            }
        
            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
              // The player has just finished playing and will stop. Maybe you want to play something else?
              loadAndPlayPost()
            }

            // Set duration left
            setSoundDuration(playbackStatus.durationMillis)
            setSoundPosition(playbackStatus.positionMillis)
            setIsPlaybackAllowed(true)
            // etc...
          }
    }

    async function loadAndPlayPost() {
        setIsLoading(true)
        console.log('Loading and play Sound')
        const { sound } = await Audio.Sound.createAsync(
            TempSoundUrl,
            { shouldPlay: true },
            onPlaybackStatusUpdate
        );
        setSound(sound)
        setIsPlaying(true)
        setIsLoading(false)
    }

    async function replayPost() {
        if (sound?._loaded) {
            console.log('Replaying Sound');
            await sound.replayAsync()
        } else {
            console.log('error replaying post')
        }
    }

    async function playPost() {
        if (sound?._loaded) {
            console.log('Playing Sound');
            await sound.playAsync()
        } else {
            console.log('error playing post')
        }
    }

    async function pausePost() {
        if (sound?._loaded) {
            console.log('Pausing Sound');
            await sound.pauseAsync()
        } else {
            console.log('error pausing post')
        }
    }

    async function onPlayPausePressed() {
        if (isPlaying) {
            pausePost()
        } else {
            playPost()
        }
      };

    function handleOnPress() {
        if (!sound?._loaded) {
            loadAndPlayPost()
            setExpanded(true)
        } else if (expanded){
            pausePost()
            setExpanded(false)
        } else if (!expanded){
            playPost()
            setExpanded(true);
        }
    }

    function getSeekSliderPosition() {
        if (
            sound?._loaded &&
            soundPosition != undefined &&
            soundDuration != undefined
        ) {
            return soundPosition / soundDuration;
        }
        return 0;
    }

    async function onSeekSliderSlidingComplete(value: number) {
        if (sound?._loaded) {
          setIsSeeking(false)
          const seekPosition = value * (soundDuration || 0);
          if (shouldPlayAtEndOfSeek) {
            sound.playFromPositionAsync(seekPosition);
          } else {
            sound.setPositionAsync(seekPosition);
          }
        }
    };
    
    function onSeekSliderValueChange(value: number) {
        if (sound?._loaded && !isSeeking) {
            setIsSeeking(true)
            setShouldPlayAtEndOfSeek(shouldPlay)
        }
    };

    function getPlaybackTimestamp() {
        if (
          sound?._loaded &&
          soundPosition != undefined &&
          soundDuration != undefined
        ) {
          return `${getSSFromMillis(soundPosition)} / ${getSSFromMillis(soundDuration)}`;
        }
        return "- / -";
    }

    function getSSFromMillis(millis: number) {
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return seconds;
      }
    
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
            onPress={handleOnPress}
            style={({ pressed }) => [
                {backgroundColor: pressed
                    ? 'gray'
                    : '#e0f0ff'
                }]}
        >
        <View style={styles.pressableView}>
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
    
                <View style={styles.hashtagView}>
                    {post.hashtags.map(hashtag => 
                        <Text style={styles.hashtag}>{hashtag.text}</Text>
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
            onPlayPausePressed={onPlayPausePressed}
            commentsCount={post.commentsCount}
            isPlaybackAllowed={isPlaybackAllowed}
            isLoading={isLoading}
            getSeekSliderPosition={getSeekSliderPosition}
            onSeekSliderValueChange={onSeekSliderValueChange}
            onSeekSliderSlidingComplete={onSeekSliderSlidingComplete}
            getPlaybackTimestamp={getPlaybackTimestamp}
            />
        }
    </View>
    );
}; 
