import React, { Dispatch, SetStateAction, useState } from 'react';
import { Image, StyleSheet, View, Text, Pressable } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  pressable: {
    flexDirection: 'row'
  },
  image: {
    width: 30,
    height: 30,
  },
  text: {   
    fontSize: 12,
  },
  leftView: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-end',
  },
  rightView: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-start',
    marginLeft: 5,
  },
}); 

interface Props {
  count: number
}

export const Comments = ({ 
    count
}: Props) => {

    function handleOnPress() {
        console.log("comment button pressed")
    }
    
    return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        onPress={handleOnPress}
        >
        <View style={styles.leftView}>
            <Image 
                style={styles.image}
                source={require('../../../assets/images/51904-200.png')}/>
        </View>
        <View style={styles.rightView}>
            <Text style={styles.text}>{count}</Text>
        </View>
      </Pressable>
    </View>
    );
}; 