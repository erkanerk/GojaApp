import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
  playbackSlider: {
    alignSelf: "stretch",
  },
  playbackTimestamp: {
    textAlign: "right",
    alignSelf: "stretch",
    paddingRight: 20,
  },
}); 

interface Props {
    isPlaybackAllowed: boolean
    isLoading: boolean
    getSeekSliderPosition(): number
    onSeekSliderValueChange(value:number): void
    onSeekSliderSlidingComplete(value:number): Promise<void>
    getPlaybackTimestamp(): string,
}

export const SoundSlider = ({ 
    isPlaybackAllowed,
    isLoading,
    getSeekSliderPosition,
    onSeekSliderValueChange,
    onSeekSliderSlidingComplete,
    getPlaybackTimestamp,
}: Props) => {
    return (
    <View style={styles.container}>
        <Slider
        style={styles.playbackSlider}
        value={getSeekSliderPosition()}
        onValueChange={onSeekSliderValueChange}
        onSlidingComplete={onSeekSliderSlidingComplete}
        disabled={!isPlaybackAllowed || isLoading}/>
        <Text style={styles.playbackTimestamp}>
        {getPlaybackTimestamp()}
        </Text>
    </View>
    );
}; 