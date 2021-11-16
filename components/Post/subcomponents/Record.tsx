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
            source={require('../../../assets/images/record_button.png')}/>
      </Pressable>
    </View>
    );
}; 