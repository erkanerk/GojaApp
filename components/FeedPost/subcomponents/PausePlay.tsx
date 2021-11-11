import React, { Dispatch, SetStateAction, useState } from 'react';
import { Image, StyleSheet, View, Text, Pressable } from 'react-native';

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
    const [isLiked, setIsLiked] = useState<boolean>(false)

    function handleOnPress() {

    }
    
    return (
    <View style={styles.container}>
        <Pressable
          onPress={onPlayPausePressed}
          disabled={isLoading}
          >
          {isPlaying 
            ? 
            <Image
              style={styles.image}
              source={require('../../../assets/images/1486348534-music-pause-stop-control-play_80459.png')}/>
            : 
            <Image
              style={styles.image}
              source={require('../../../assets/images/1486348532-music-play-pause-control-go-arrow_80458.png')}/>
          }
      </Pressable>
    </View>
    );
}; 