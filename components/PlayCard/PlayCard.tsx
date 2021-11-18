import React, { useEffect, useState } from 'react';
import { View} from 'react-native';
import { StyleSheet } from 'react-native';
import { SoundSlider } from '../Post/subcomponents/SoundSlider';
import { PostInformation } from './subcomponents/PostInformation';
import { SoundController } from './subcomponents/SoundController';
import { Audio, AVPlaybackStatus } from 'expo-av';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 5,
        backgroundColor: '#F2F2F2',
        flexDirection: 'column',
    },
  }); 

interface Props {
    post: Post
}

export const PlayCard = ({ 
    post
}: Props) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [soundPosition, setSoundPosition] = useState<number | undefined>(undefined);
    const [soundDuration, setSoundDuration] = useState<number | undefined>(undefined);
    const [isSeeking, setIsSeeking] = useState<boolean>(false);
    const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = useState<boolean>(false);
    const [shouldPlay, setShouldPlay] = useState<boolean>(true);
    const [isPlaybackAllowed, setIsPlaybackAllowed] = useState<boolean>(false);
    
    function onPlaybackStatusUpdate( playbackStatus: AVPlaybackStatus ) {
        if (!playbackStatus.isLoaded) {
            // Updating UI for the unloaded state
            setIsPlaybackAllowed(false)
            setSoundDuration(undefined)
            setSoundPosition(undefined)

            if (playbackStatus.error) {
              console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            }
          } else {
            // Updating UI for the loaded state
        
            setIsPlaying(playbackStatus.isPlaying)
            setIsLoading(playbackStatus.isBuffering)
        
            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
              // The player has just finished playing
              loadAndPlayPost()
            }
            // Set slider options
            setSoundDuration(playbackStatus.durationMillis)
            setSoundPosition(playbackStatus.positionMillis)
            setIsPlaybackAllowed(true)
          }
    }

    async function loadAndPlayPost() {
        setIsLoading(true)
        console.log('Load and play Sound')
        console.log(post.audio)
        const initialStatus = { 
            shouldPlay: true,
            progressUpdateIntervalMillis: 100
        }
        const { sound } = await Audio.Sound.createAsync(
            {uri: post.audio},
            initialStatus,
            onPlaybackStatusUpdate
        );
        setSound(sound)
        setIsLoading(false)
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
            sound.pauseAsync()
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
        const seconds = ((millis % 60000) / 1000).toFixed(1);
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
        <View>
            <PostInformation 
            post={post}/>
        </View>
        <View>
            <SoundSlider 
            isPlaybackAllowed={isPlaybackAllowed}
            isLoading={isLoading}
            getSeekSliderPosition={getSeekSliderPosition}
            onSeekSliderValueChange={onSeekSliderValueChange}
            onSeekSliderSlidingComplete={onSeekSliderSlidingComplete}
            getPlaybackTimestamp={getPlaybackTimestamp}/>
        </View>
        <View>
            <SoundController />
        </View>
    </View>
    );
}; 

