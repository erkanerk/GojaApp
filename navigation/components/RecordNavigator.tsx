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
    recordIcon: {
        borderRadius: 20,
        width: 40,
        height: 40,
        backgroundColor: 'red',
    },
}); 

interface Props {}

export const RecordNavigator = ({}: Props) => {
    return (
    <View style={styles.container}>
        <View style={styles.recordIcon}/>
    </View>
    );
}; 

