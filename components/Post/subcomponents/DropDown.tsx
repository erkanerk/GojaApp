import { AVPlaybackStatus } from 'expo-av';
import React from 'react';
import { Image, View, StyleSheet, Text, Pressable } from 'react-native';
import { Comments } from './Comments';
import { PausePlay } from './PausePlay';
import { Record } from './Record';

const styles = StyleSheet.create({
  container: {
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
}

export const DropDown = ({ 
  isPlaying,
  commentsCount,
  onPlayPausePressed
}: Props) => {
    return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        <Record />
      </View>
      <View style={styles.middleView}>
        <PausePlay 
          isPlaying={isPlaying}
          onPlayPausePressed={onPlayPausePressed}/>
      </View>
      <View style={styles.rightView}>
        <Comments 
        count={commentsCount}/>
      </View>
    </View>
    );
}; 