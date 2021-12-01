import React from 'react';
import { Image, StyleSheet, View, Pressable } from 'react-native';
import { Play, Pause, FastForward, Rewind } from "react-native-feather";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    previousView: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'flex-end',
    },
    playPauseView: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',

    },  
    nextView: {
        flex: 1,
        alignItems: 'flex-start',
    },
}); 

interface Props {
    isLoading: boolean
    isPlaying: boolean
    playPausePost(): Promise<void>
    playNextPost(): Promise<void>
    playPreviousPost(): Promise<void>
}

export const SoundController = ({ 
    isLoading,
    isPlaying,
    playPausePost,
    playPreviousPost,
    playNextPost
}: Props) => {

    function handlePlayPrevious() {
        console.log("Previous button pressed")
        playPreviousPost()
    }


    function handlePlayPause() {
        console.log("Play/paused button pressed")
        playPausePost()
    }



    function handlePlayNext() {
        console.log("Next button pressed")
        playNextPost()
    }
    
    return (
    <View style={styles.container}>
        <View style={styles.previousView}>
            <Pressable
            onPress={handlePlayPrevious}
            disabled={isLoading}>
                <Rewind stroke="black" fill="black" width={40} height={40} />
            </Pressable>
        </View>
        <View style={styles.playPauseView}>
            <Pressable
            onPress={handlePlayPause}
            disabled={isLoading}>
                {isPlaying
                    ? 
                    <Pause stroke="black" fill="black" width={40} height={40} />
                    : 
                    <Play stroke="black" fill="black" width={40} height={40} />
                }
            </Pressable>
        </View>
        <View style={styles.nextView}>
            <Pressable
            onPress={handlePlayNext}
            disabled={isLoading}>
                <FastForward stroke="black" fill="black" width={40} height={40} />
            </Pressable>
        </View>
    </View>
    );
}; 