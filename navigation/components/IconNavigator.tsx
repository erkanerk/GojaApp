import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { RootStackParamList, RootTabParamList } from '../../types';
import { LogoutButton } from '../../components/Logout/LogoutButton';

const styles = StyleSheet.create({
    container: {
    },
    image: {
        width: 40,
        height: 40
    }
}); 

interface Props {}

export const IconNavigator = ({}: Props) => {
    return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../../assets/images/parrot.png')}/> 
    </View>
    );
}; 

