import React from 'react';
import { Image, StyleSheet, View, Text, Pressable } from 'react-native';
import { MessageCircle } from "react-native-feather";


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
  text: {   
    marginLeft: 5,
    fontSize: 15,
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
            <MessageCircle stroke="black" fill="white" width={25} height={25} strokeWidth={1} />
        </View>
        <View>
            <Text style={styles.text}>{count}</Text>
        </View>
      </Pressable>
    </View>
    );
}; 