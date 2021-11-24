import React from 'react'
import { View, StyleSheet, Pressable, Text, Button, Image } from 'react-native';

export const TopBar = () => {
    return (
        <View style={{flexDirection: 'row'}}>
        <Text>Cancel</Text>
        <Image />
        <Text>Post</Text>
        </View>
    )
}
