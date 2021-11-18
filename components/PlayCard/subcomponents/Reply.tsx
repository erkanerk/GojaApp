import React from 'react';
import { Image, StyleSheet, View, Pressable } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
}); 

// TODO: This whole component man

interface Props {
    post: Post
}

export const Reply = ({ 
    post
}: Props) => {

    function handleOnPress() {
        console.log("Reply button pressed")
    }
    
    return (
    <View style={styles.container}>
      <Pressable
        onPress={handleOnPress}
        >
        <Image 
            style={styles.image}
            source={require('../../../assets/images/reply_icon.png')}/>
      </Pressable>
    </View>
    );
}; 