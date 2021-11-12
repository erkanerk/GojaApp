import React, { Dispatch, SetStateAction, useState } from 'react';
import { Image, StyleSheet, View, Text, Pressable } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
  },
  image: {
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  }
}); 

interface Props {
  likes: number
  setLikes: Dispatch<SetStateAction<number>>
}

export const Likes = ({ 
    likes,
    setLikes
}: Props) => {
    const [isLiked, setIsLiked] = useState<boolean>(false)

    function handleLike() {
      if (isLiked) {
        setIsLiked(false)
        setLikes(likes-1)
      } else {
        setIsLiked(true)
        setLikes(likes+1)
      }
    }
    
    return (
    <View style={styles.container}>
      <Pressable
        onPress={handleLike}
        >
        {isLiked 
          ? 
          <Image
            style={styles.image}
            source={require('../../../assets/images/heart-431.png')}/>
          : 
          <Image
            style={styles.image}
            source={require('../../../assets/images/heart-492.png')}/>
        }
      </Pressable>
      <Text style={styles.text}>{likes}</Text>
    </View>
    );
}; 