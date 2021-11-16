import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Comments } from './Comments';
import { PausePlay } from './PausePlay';
import { Record } from './Record';
import { SoundSlider } from './SoundSlider';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin: 20,
  },
  sliderContainer: {
    flex: 1,
  },
  functionalityContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  leftView: {
    flex: 1,
    alignSelf: 'center',
  },
  middleView: {
    flex: 1,
    alignSelf: 'center',
  },
  rightView: {
    flex: 1,
    alignSelf: 'center',
  },
}); 

interface Props {
  isPlaying: boolean
  commentsCount: number
  onPlayPausePressed(): Promise<void>

  isPlaybackAllowed: boolean
  isLoading: boolean
  getSeekSliderPosition(): number
  onSeekSliderValueChange(value:number): void
  onSeekSliderSlidingComplete(value:number): Promise<void>
  getPlaybackTimestamp(): string,
}

export const DropDown = ({ 
  isPlaying,
  commentsCount,
  onPlayPausePressed,
  
  isPlaybackAllowed,
  isLoading,
  getSeekSliderPosition,
  onSeekSliderValueChange,
  onSeekSliderSlidingComplete,
  getPlaybackTimestamp,
}: Props) => {
    return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <SoundSlider 
          isPlaybackAllowed={isPlaybackAllowed}
          isLoading={isLoading}
          getSeekSliderPosition={getSeekSliderPosition}
          onSeekSliderValueChange={onSeekSliderValueChange}
          onSeekSliderSlidingComplete={onSeekSliderSlidingComplete}
          getPlaybackTimestamp={getPlaybackTimestamp}
          />
      </View>
      <View style={styles.functionalityContainer}>
        <View style={styles.leftView}>
          <Record />
        </View>
        <View style={styles.middleView}>
          <PausePlay 
            isPlaying={isPlaying}
            isLoading={isLoading}
            onPlayPausePressed={onPlayPausePressed}/>
        </View>
        <View style={styles.rightView}>
          <Comments 
          count={commentsCount}/>
        </View>
      </View>
    </View>
    );
}; 