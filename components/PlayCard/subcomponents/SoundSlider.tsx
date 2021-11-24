import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
    },
    text: {
        textAlign: "right",
        alignSelf: "stretch",
        paddingRight: 20,
        fontSize: 12,
        color: 'gray',
    },
    slider: {
        alignSelf: 'stretch',
        opacity: 1,
        height: 20,
        marginTop: 10,
    },
}); 

interface Props {
    isPlaybackAllowed: boolean
    isLoading: boolean
    seekSliderPosition: number
    playbackTimestamp: string
    onSeekSliderValueChange(value:number): void
    onSeekSliderSlidingComplete(value:number): Promise<void>
}

export const SoundSlider = ({ 
    isPlaybackAllowed,
    isLoading,
    seekSliderPosition,
    onSeekSliderValueChange,
    onSeekSliderSlidingComplete,
    playbackTimestamp,
}: Props) => {
    return (
    <View style={styles.container}>
        <Slider
        style={styles.slider}
        value={seekSliderPosition}
        onValueChange={onSeekSliderValueChange}
        onSlidingComplete={onSeekSliderSlidingComplete}
        disabled={!isPlaybackAllowed || isLoading}
        maximumTrackTintColor='transparent'
        minimumTrackTintColor='#FF0000'
        thumbTintColor='transparent'
        />
        <Text style={styles.text}>
            {playbackTimestamp} s
        </Text>
    </View>
    );
}; 