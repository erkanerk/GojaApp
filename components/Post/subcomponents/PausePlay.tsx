import React from 'react';
import { Image, StyleSheet, View, Pressable } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 12,
  }
}); 

interface Props {
    isPlaying: boolean
    isLoading: boolean
    onPlayPausePressed(): Promise<void>
}

export const PausePlay = ({ 
    isPlaying,
    isLoading,
    onPlayPausePressed
}: Props) => {

    function handleOnPress() {
      onPlayPausePressed()
    }
    
    return (
    <View style={styles.container}>
        <Pressable
          onPress={handleOnPress}
          disabled={isLoading}
          >
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
    );
}; 