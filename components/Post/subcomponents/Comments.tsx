import React from 'react';
import { Image, StyleSheet, View, Text, Pressable } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  pressable: {
    flexDirection: 'row'
  },
  image: {
    width: 20,
    height: 20,
  },
  text: {   
    marginLeft: 5,
    fontSize: 12,
  }
}); 

interface Props {
  post: Post
}

export const Comments = ({ 
    post
}: Props) => {
    // TODO: Temporary count
    const count = 4
    
    function handleOnPress() {
        console.log("comment button pressed")
    }
    
    return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        onPress={handleOnPress}
        >
        <View>
            <Image 
                style={styles.image}
                source={require('../../../assets/images/speech_bubble_icon.png')}/>
        </View>
        <View>
            <Text style={styles.text}>{count}</Text>
        </View>
      </Pressable>
    </View>
    );
}; 