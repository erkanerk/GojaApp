import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { RootStackParamList, RootTabParamList } from '../../types';
import { Bell } from "react-native-feather";

const styles = StyleSheet.create({
    container: {
        marginRight: 20,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
  }); 

interface Props {
    route: any
    navigation: any
}

export const NotificationNavigator = ({ 
    route,
    navigation
}: Props) => {

    function handleOnPress() {
        console.log('Pressed notification')
        navigation.navigate('NotificationScreen')
    }

    return (
    <View style={styles.container}>
        <Pressable
        onPress={handleOnPress}>
            <Bell stroke="black" width={30} height={30} />
        </Pressable>
    </View>
    );
}; 

