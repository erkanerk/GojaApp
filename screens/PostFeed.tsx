import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { RootTabScreenProps } from '../types';
import { Post } from '../components/Post/Post';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { PlayCard } from '../components/PlayCard/PlayCard';
import { Audio, AVPlaybackStatus } from 'expo-av';

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
    },
    feedView: {
        flex: 1,
    },
    playCardView: {

    },
});

export default function PostFeed({ 
    navigation 
}: RootTabScreenProps<'TabThree'>) {
    const [posts, setPosts] = useState<Post[] | undefined>(undefined)
    const [focusedPostIndex, setFocusedPostIndex] = useState<number | undefined>(undefined)
    const [sound, setSound] = useState<Audio.Sound | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [soundDuration, setSoundDuration] = useState<number | undefined>(undefined)
    const [isSeeking, setIsSeeking] = useState<boolean>(false)
    const [isPlaybackAllowed, setIsPlaybackAllowed] = useState<boolean>(false)
    const [seekSliderPosition, setSeekSliderPosition] = useState<number>(0)
    const [playbackTimestamp, setPlaybackTimestamp] = useState<string>("0")
    const shouldPlayAtEndOfSeek = true

    function onPlaybackStatusUpdate( playbackStatus: AVPlaybackStatus ) {
        if (!playbackStatus.isLoaded) {
            // Updating UI for the unloaded state
            setIsPlaybackAllowed(false)
            setSoundDuration(undefined)

            if (playbackStatus.error) {
              console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            }
          } else {
            // Updating UI for the loaded state
        
            setIsPlaying(playbackStatus.isPlaying)
            setIsLoading(playbackStatus.isBuffering)
        
            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
              // The player has just finished playing
              replayPost()
            }
            // Set slider options
            setSoundDuration(playbackStatus.durationMillis)
            if (playbackStatus.durationMillis != undefined) {
                setSeekSliderPosition(playbackStatus.positionMillis / playbackStatus.durationMillis)
            }
            setIsPlaybackAllowed(true)
            setPlaybackTimestamp(getSSFromMillis(playbackStatus.positionMillis))
          }
    }

    async function loadAndPlayPost() {
        if (posts && focusedPostIndex != undefined) {
            setIsLoading(true)
            console.log('Loading and playing Sound')
            const initialStatus = { 
                shouldPlay: true,
                isLooping: true,
                progressUpdateIntervalMillis: 50
                
            }
            const { sound } = await Audio.Sound.createAsync(
                {uri: posts[focusedPostIndex].audio},
                initialStatus,
                onPlaybackStatusUpdate
            );
            setSound(sound)
            setIsLoading(false)
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

    async function replayPost() {
        if (sound?._loaded) {
            console.log('Replaying Sound');
            await sound.replayAsync()
        } else {
            console.log('error replaying post')
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

    async function playPausePost() {
        if (isPlaying) {
            pausePost()
        } else {
            playPost()
        }
      };

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
            // sound.pauseAsync()
        }
    };

    function getSSFromMillis(millis: number) {
        const seconds = ((millis % 60000) / 1000).toFixed(2)
        return seconds;
    }

    async function playPreviousPost() {
        console.log("Playing previous post")
        if (focusedPostIndex != undefined && focusedPostIndex > 0) {
            setFocusedPostIndex(focusedPostIndex-1)
        }
    }

    async function playNextPost() {
        console.log("Playing next post")
        if (focusedPostIndex != undefined && posts && focusedPostIndex < posts?.length - 1) {
            setFocusedPostIndex(focusedPostIndex+1)
        }
    }

    useEffect(() => {
        if (focusedPostIndex != undefined && !sound?._loaded) {
            console.log("No previous post has been loaded, playing the focused post")
            loadAndPlayPost()
        } else if (focusedPostIndex != undefined && sound?._loaded) {
            console.log("Changed post to play, loading and playing that post while unloading previous post")
            sound.unloadAsync();
            loadAndPlayPost()
        } else if (focusedPostIndex == undefined && sound?._loaded) {
            console.log("Post has been unfocused, unloading sound")
            sound.unloadAsync(); 
        }
      }, [focusedPostIndex]);

    useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);

    useEffect(() => {
        setIsLoading(true)
        axios
          .get('http://localhost:3000/posts/all',{
              headers: {
                  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThiZDRmYjVmYThjNjQxNDNlYWE1NTMiLCJpYXQiOjE2MzcxNDYxNjh9.HdtsKrKNkpVFSqe6QzsRCCSAUIq8j_a4aazaV4RVaiM'
              }
          })
          .then(function (response) {
            // handle success
            console.log("Successfull posts/like response: \n" + JSON.stringify(response.data))
            setPosts(response.data)
          })
          .catch(function (error) {
            // handle error
            console.log("Something went wrong when using posts/all: " + error.message)
          })
          .finally(function () {
            // always executed
            console.log("finally")
          });
          setIsLoading(false)
    }, []);

    const renderPost = ({ item, index, separators }:any) => (
        <Post 
        post={item}
        index={index}
        focusedPostIndex={focusedPostIndex}
        setFocusedPostIndex={setFocusedPostIndex}/>
    );

    return (
    <View style={styles.container}>
        {isLoading ? <Text>Loading...</Text> : null}
        <View style={styles.feedView}>
            <FlatList
            data={posts}
            keyExtractor={post => post._id}
            renderItem={renderPost}/>
        </View>
        <View style={styles.playCardView}>
            {posts && soundDuration && focusedPostIndex != undefined ?
                <PlayCard 
                post={posts[focusedPostIndex]}
                isPlaybackAllowed={isPlaybackAllowed}
                isLoading={isLoading}
                isPlaying={isPlaying}
                seekSliderPosition={seekSliderPosition}
                onSeekSliderValueChange={onSeekSliderValueChange}
                onSeekSliderSlidingComplete={onSeekSliderSlidingComplete}
                playbackTimestamp={playbackTimestamp}
                playPausePost={playPausePost}
                playNextPost={playNextPost}
                playPreviousPost={playPreviousPost}/>
            : null}
        </View>
    </View>
    );
}

