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
}); 


export const Record = () => {

    function handleOnPress() {
        console.log("Record button pressed")
    }
    
    return (
    <View style={styles.container}>
      <Pressable
        onPress={handleOnPress}
        >
        <Image
            style={styles.image}
            source={require('../../../assets/images/red-circle-1155276042606ekqvli9k.png')}/>
      </Pressable>
    </View>
    );
}; 