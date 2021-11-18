import React from 'react';
import { Image, StyleSheet, View, Pressable } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    image: {
        width: 30,
        height: 30,
    },
    text: {
        fontSize: 12,
    },
    previousView: {
        flex: 1,
    },
    playPauseView: {
        flex: 1,
    },  
    nextView: {
        flex: 1,
    },
}); 

interface Props {

}

export const SoundController = ({ 

}: Props) => {

    const isLoading = false
    const isPlaying = false

    function handlePlayPrevious() {
        console.log("Previous button pressed")
    }


    function handlePlayPause() {
        console.log("Play/paused button pressed")
    }



    function handlePlayNext() {
        console.log("Next button pressed")
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