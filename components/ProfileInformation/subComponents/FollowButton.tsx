import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        borderColor: 'red',
        borderWidth: 3,
        borderRadius: 30,
    },
    text: {
        color: 'red',
        fontWeight: 'bold',
    }
});

interface Props {

}
export const FollowButton = ({ 
    
}: Props) => {

    function handleOnPress() {
        console.log("Follow button pressed")
      }

    return (
    <View style={styles.container}>
        <Pressable
        onPress={handleOnPress}>
            <Text style={styles.text}>+ Follow</Text>
        </Pressable>
    </View>
    );
}

