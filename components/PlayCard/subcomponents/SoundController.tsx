import React from 'react';
import { Image, StyleSheet, View, Pressable } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    image: {
        width: 30,
        height: 30,
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
                <Image
                style={styles.image}
                source={require('../../../assets/images/previous_icon.png')}/>
            </Pressable>
        </View>
        <View style={styles.playPauseView}>
            <Pressable
            onPress={handlePlayPause}
            disabled={isLoading}>
                {isPlaying
                    ? 
                    <Image
                    style={styles.image}
                    source={require('../../../assets/images/pause_button.png')}/>
                    : 
                    <Image
                    style={styles.image}
                    source={require('../../../assets/images/play_button.png')}/>
                }
            </Pressable>
        </View>
        <View style={styles.nextView}>
            <Pressable
            onPress={handlePlayNext}
            disabled={isLoading}>
                <Image
                style={styles.image}
                source={require('../../../assets/images/next_icon.png')}/>
            </Pressable>
        </View>
    </View>
    );
}; 